var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var connected = [];

var publishToAllListeners = function(message) {
  var max = connected.length, i, socket;
  for (i=0; i<max; ++i) {
    socket = connected[i];
    socket.emit('chat', { message: message });
  }
}

io.sockets.on('connection', function (socket) {
  connected.push(socket);
  socket.emit('chat', { message: 'hello' });
  socket.on('backchat', function (data) {
    publishToAllListeners(data.message);
  });
});

process.stdin.resume();
process.stdin.on('data', function(chunk) {
  publishToAllListeners("" + chunk);
});