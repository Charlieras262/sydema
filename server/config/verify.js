const User = require('../models/user');
const Chat = require('../models/chat');

module.exports.createAdminUser = () => {
    User.findOne({ _id: 'ADMINUSER001' }, (err, user) => {
        const newUser = new User({
            _id: 'ADMINUSER001',
            name: 'ADMIN',
            email: 'adminuser@sydema.com',
            username: 'Admin User',
            password: 'adminuser1234',
            type: 'A'
        });
        if (err) throw err;
        if (!user) {
            console.log('Admin User has not created');
            console.log('Creating...');
            User.addUser(newUser, (err, user) => {
                if (err || !user) {
                    console.log('Error while Server was creating the Admin');
                } else {
                    const chat = new Chat({_id: 'ADMINUSER001'});
                    chat.save();
                    console.log('Admin User Has Created Successfully');
                }
            });
        } else {
            console.log('Admin User has already Created');
        }
    });
}