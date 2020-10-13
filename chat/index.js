var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('user connected', (nickname) => {
        io.emit('user connected', nickname);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg, nickname, date) => {
        io.emit('chat message', msg, nickname, date);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});