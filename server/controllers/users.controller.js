const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const userCTRL = {};

userCTRL.authRegisterInfo = (req, res) => {
  var id, name, email, username, password, cpass = req.body.cpass,
    success = false;
  let newUser = new User({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type
  });
  id = isFilled(newUser._id, "ID");
  name = isFilled(newUser.name, "Name");
  email = isFilled(newUser.email, "Email");
  username = isFilled(newUser.username, "username");
  password = isFilled(newUser.password, "password");

  if (id.success && name.success && email.success && username.success && password.success) {
    if (newUser.type.toString() == "S") {
      Student.getStudentbyCarne(newUser._id, (err, student) => {
        if (err) throw err;
        if (!student) {
          id = {
            success: false,
            msg: 'Invalid carne, please enter a created carne.'
          };
        } else {
          var stud = JSON.parse(JSON.stringify(student));
          id = {
            success: true,
            msg: 'Valid Carne.',
            name: stud.name + " " + stud.lastName
          };
        }
        User.getUserById(newUser._id, (err, user) => {
          if (err) throw err;
          if (user) {
            id = {
              success: false,
              msg: 'Invalid carne, please enter an unused carne.'
            };
          }
          email = valEmail(newUser.email);
          User.getUserByEmail(newUser.email, (err, user) => {
            if (err) throw err;
            if (user) {
              email = {
                success: false,
                msg: 'The email is already used.'
              };
            }
            password = valPass(newUser.password, cpass);

            if (id.success && name.success && email.success && username.success && password.success) {
              success = true;
            }

            res.json({
              id: id,
              name: name,
              email: email,
              username: username,
              password: password,
              success: success
            });
          });
        });
      });
    } else if (newUser.type.toString() == 'A') {
      res.json({
        id: {
          success: true,
          msg: ''
        },
        name: {
          success: true,
          msg: ''
        },
        email: {
          success: true,
          msg: ''
        },
        username: {
          success: true,
          msg: ''
        },
        password: {
          success: true,
          msg: ''
        },
        success: true
      });
    }else{
      Teacher.getTeacherbyCode(newUser._id, (err, teacher) => {
        if (err) throw err;
        if (!teacher) {
          id = {
            success: false,
            msg: 'Invalid code, please enter a created code.'
          };
        } else {
          var teach = JSON.parse(JSON.stringify(teacher));
          id = {
            success: true,
            msg: 'Valid Code.',
            name: teach.name + " " + teach.lastName
          };
        }
        User.getUserById(newUser._id, (err, user) => {
          if (err) throw err;
          if (user) {
            id = {
              success: false,
              msg: 'Invalid code, please enter an unused code.'
            };
          }
          email = valEmail(newUser.email);
          User.getUserByEmail(newUser.email, (err, user) => {
            if (err) throw err;
            if (user) {
              email = {
                success: false,
                msg: 'The email is already used.'
              };
            }
            password = valPass(newUser.password, cpass);

            if (id.success && name.success && email.success && username.success && password.success) {
              success = true;
            }
            res.json({
              id: id,
              name: name,
              email: email,
              username: username,
              password: password,
              success: success
            });
          });
        });
      });
    }
  } else {
    res.json({
      id: id,
      name: name,
      email: email,
      username: username,
      password: password,
      success: success
    });
  }
}

userCTRL.register = (req, res) => {
  let newUser = new User({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to register user (' + err + ")."
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
}

userCTRL.authenticate = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            type: user.type
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
}

userCTRL.profile = (req, res) => {
  res.json({
    user: req.user
  });
}

userCTRL.getUserByEmail = (req, res) => {
  var email = req.params.id;
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: true,
        msg: 'The email is not used yet.'
      });
    } else {
      return res.json({
        success: false,
        msg: 'The email is already used.'
      });
    }
  });
}
userCTRL.getUserByUsername = (req, res) => {
  var username = req.params.id;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: true,
        msg: 'The username is not used yet.'
      });
    } else {
      return res.json({
        success: false,
        msg: 'The username is already used.'
      });
    }
  });
}

var isFilled = (data, nameFiel) => {
  if (data == undefined || data == ' ' || data == '') {
    return {
      success: false,
      msg: 'The field "' + nameFiel + '" is empty'
    };
  } else {
    return {
      success: true,
      msg: 'The field is filled'
    };
  }
}

var valPass = (pass, cpass) => {
  if (pass !== cpass) {
    return {
      success: false,
      msg: 'Password and Confirm Password are not the same. '
    };
  } else {
    return {
      success: true,
      msg: 'Valid'
    };
  }
}

var valEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return {
      success: false,
      msg: 'Email Format is incorrect: abc123@abc.com. '
    };
  } else {
    return {
      success: true,
      msg: 'Email Valid'
    };
  }
}

userCTRL.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
}

userCTRL.getUserByUser = async (req, res) => {
  User.getUserByUser(req.params.username, (err, user) => {
    if(err) throw err;
    if(user){
      res.json({success: true, msg: 'User found', users: user});
    }else{
      res.json({success: false, msg: 'User not found'});
    }
  });
};

module.exports = userCTRL;
