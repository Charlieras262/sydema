const student = require('../models/student');

let users = {}
module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('getCourse', (data) => {
      student.getStudentbyCarne(data, (err, s) => {
        if (err) throw err;
        io.sockets.emit('getCourse', s);
      })
    });
    socket.on('getUsername', (data) => {
      io.sockets.emit('getUsername', data);
    });

    socket.on('sendMessage', (data, to, date, from) => {
      if(users[to] !== undefined){
        users[to].emit('sendMessage', data, to, date, from);
      }else{
        var queue = {msg: data, from: from, to: to, at: date}
        console.log('User '+to+' is disconnected'+', Message in queue is: ');
        console.log(queue);
      }
    });

    socket.on('userIsTyping', (to, status) => {
      if(users[to] !== undefined){
        users[to].emit('userIsTyping', to, status);
      }
    });

    socket.on('chatJoin', data => {
      socket.nickname = data;
      users[socket.nickname] = socket;
      console.log('User '+data+' Connected');
    });
  });
}