const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
const URL = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chatserverdb', { useNewUrlParser: true })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((error) => {
    throw error;
  })

const db = mongoose.connection;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

io.on('connection', socket => {
  socket.on('message', msg => {
    console.log('msg recieved', msg);
    io.emit("new_message", msg);
  })
});

io.on('connection', socket => {
  socket.on('newConversation', user => {
    console.log('new receiver', user);
    io.emit('receiver', user);
  })
})

io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});

app.get('/',(req, res) => {
  res.send('Chat server is running...!')
})

app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.use(express.static('uploads'));

server.listen(port, () => console.log('server is running on' + port));
