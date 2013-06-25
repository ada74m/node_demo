Build an app
============
* `mkdir node_chat` 
* `cd node_chat` 
* create file package.json containing this:

          {
            "name": "node-chat",
            "version": "0.0.1"
          }

* `npm install express -save`
* see dependency added in package.json
* create server.js in text editor

        var app = require('express')(), 
            server = require('http').createServer(app);

        var port = process.env.port || 80;

        app.get('/', function (req, res) {
          res.sendfile(__dirname + '/views/index.html');
        });

        server.listen(port);

* `mkdir views`
* create index.html file under views
  
        <html>
          <head>
            <title>Node chat</title>
          </head>
          <body>
            <h1>Node chat</h1>
          </body>
        <html>

*  `node server.js`
* show static page being served
* `npm install socket.io -save`
* see socket.io in package.json
* add `io = require('socket.io').listen(server)` to the top of server.js so now it looks like this:

          var app = require('express')(), 
              server = require('http').createServer(app),
              io = require('socket.io').listen(server);

* now the socket.io server component will be running. One of the things the server component does is serve out the client-side javascript required on the browser.
* So put this in `<head>` of index.html (N.B. we'll be using jquery a bit later so add that in now, too)

          <script src="/socket.io/socket.io.js"></script>
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>

* Run `node server.js`, visit page in browser and see the clientside script's been loaded
* Now we want to make the server send some data to the client, when the client first connects. Add the following to server.js

          io.sockets.on('connection', function (socket) {
            socket.emit('chat', { message: 'welcome to node chat' });
          });

* And we want to make the client respond to the "chat" message, so add this script to index.html

          <script>
            function startListening(socket) {
              socket.on('chat', function (data) {
                $('#conversation').append("<li>" + data .message + "</li>"); 
              });
            }

            $(function() {
              var socket = io.connect('/');
              startListening(socket);
            });
          </script>

* This wants to append `<li>` elements underneath an element with id `conversation`, so add this to the body:

          <ul id="conversation"></ul>

* Run `node server.js` again, visit the page and see the welcome message being writen out when the connection is made 
* Now we'd like the client to send messages back to the server. The user will type a message into a text box and click a button to send it. Add the following to index.html

          <input id="message" />
          <button id="send">send</button>

* And also this...

          function startTalking(socket) {
              $('#send').click(function() {
                var msg = $('#message').val();
                socket.emit('backchat', { message: msg });
              });
          }

* And call this function from the page load event: `startTalking(socket);`
* Now, the client is sending the server an event named 'backchat' containing the user's message. We need to make the server respond to it.
* When a message is received by the server, we'll want to send it to every connected client, so we need the server to keep track of all the connected clients. Add this to server.js:

          var connected = [];

* and this (inside the "on connection" block):

          connected.push(socket);

* then, underneath `var connected = [];`, add this function:

          var publishToAllListeners = function(message) {
            var max = connected.length, i, socket;
            for (i=0; i<max; ++i) {
              socket = connected[i];
              socket.emit('chat', { message: message });
            }
          }

* and under `connected.push(socket);` add code to call it whenever the 'backchat' event is received:

          socket.on('backchat', function (data) {
            publishToAllListeners(data.message);
          });

* Run `node server.js` and launch two browsers.
* Type a message in one browser and see it pop up in the other one too.


Publish to azure
================

* Socket.io uses various channels to communicate between server and client: web sockets if available, long polling, flash. Windows Azure websites don't let you open web sockets, so if we want it to work on Azure we need to tell socket.io to use long polling instead. Add this near the top of server.js

          io.configure(function () { 
            io.set("transports", ["xhr-polling"]); 
            io.set("polling duration", 10); 
          });

  * log on to azure portal
  * click new -> compute -> website -> quick create
  * url = 'node-chat', region = 'North Europe'
  * go into new website, click "Setup deployment from source control" and select "local git repository"
  * create a .gitignore file (maybe copy from another project)
  * then do 

          git init
          git add .
          git commit -m "initial commit"          

  * then

          git remote add azure https://ada74m@node-chat.scm.azurewebsites.net/node-chat.git
          git push azure master 

