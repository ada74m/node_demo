var app = require('express')(), 
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = process.env.port || 80;

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


var connected = [];

var publishToAllListeners = function(message) {
  var max = connected.length, i, socket;
  for (i=0; i<max; ++i) {
    socket = connected[i];
    socket.emit('chat', { message: message });
  }
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('chat', { message: 'welcome to node chat' });
  connected.push(socket);
  socket.on('backchat', function (data) {
    publishToAllListeners(data.message);
  });
});

server.listen(port);