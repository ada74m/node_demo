node_demo
=========

* what it is, where it came from
	* browser wars 2.0 javascript engine arms race
	* took V8 engine, ran on server, added non-blocking HTTP, filesystem and other libraries
* .NET equivalences
	* npm <-> NuGet
	* Express <-> Nancy
	* socket.io <-> SignalR
	* Jasmine/Mocha <-> NUnit/MSTest

Build an app
============
* `mkdir node_chat` 
* `cd node_chat` 
* `echo {} > package.json`
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
* `node server.js`
* show static page being served
* add dependency to socket.io
* add code on connection to emit some event
* add clientside code to index.html. See how socket.io serves its own clientside script
* add clientside event handler that writes to console on event received from server
* add stdio code to server. When anything's typed on stdin, publish it to all listeners
* launch two browsers (with consoles showing) and see messages from server being published.
* re-work client so it puts messages in a <UL> element on the page instead of on console
* add textbox and button to client. When button clicked, emit an event for the server to listen for
* make server listen for event. On receiving it, publish to all listeners.
* refresh browsers and demonstrate real-time chat

* publish to azure
  * log on to azure portal
  * new ->  compute -> website -> quick create 
  * url = nodeazchat, region = North Europe 
  * click create and wait
  * go into new website, click "Setup deployment from source control" and select "local git repository"
  * see instructions on how to publish
  * in git bash, do 
    * git remote add azure https://ada74m@nodeazchat.scm.azurewebsites.net/nodeazchat.git
    * git push azure master 

ideas
=====

* publish it on Azure
* tests
* error handling
