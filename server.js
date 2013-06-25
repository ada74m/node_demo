var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var port = process.env.port || 80;

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
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

// process.stdin.resume();
// process.stdin.on('data', function(chunk) {
//   publishToAllListeners("" + chunk);
// });