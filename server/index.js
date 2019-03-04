const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const passport = require('passport');
const path = require('path');
const users = require('./routes/users.routes');
const students = require('./routes/students.routes');
const teacher = require('./routes/teachers.routes');
const course = require('./routes/courses.routes');
const career = require('./routes/institution.routes');
const asignation = require('./routes/asignations.routes');
const uploadRoute = require('./routes/upload.routes');
const homework = require('./routes/homework.routes');
const activity = require('./routes/activity.routes');
const methodOverride = require('method-override');
const chat = require('./routes/chat.routes');
const conversation = require('./routes/conversation.routes');
const message = require('./routes/message.routes');
const admin = require('./config/verify');

// Setup Server
const app = express();
app.set('port', process.env.PORT || 8080);

// Connect To Database

mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
  admin.createAdminUser();
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

require('./config/passport')(passport);

// Routes
app.use('/api/students', students);
app.use('/api/teachers', teacher);
app.use('/api/courses', course);
app.use('/api/careers', career);
app.use('/api/asignations', asignation);
app.use('/api/users', users);
app.use('/api/upload', uploadRoute);
app.use('/api/homework', homework);
app.use('/api/activity', activity);
app.use('/api/chat', chat);
app.use('/api/chat/conversation', conversation);
app.use('/api/chat/conversation/msg', message);

// Set Static Folder

app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Starting Server
var server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

require('./websocket/socket.io')(io);

module.exports = app;
