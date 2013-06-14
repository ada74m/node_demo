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
* install node
	* download from http://nodejs.org/
* add a package.josn file
  * add dependency for express
* run npm install, see express installed
* create app.json
* wire up default root "/" to serve a static file (index.html)
* add dependency to socket.io
* add code on connection to emit some event
* add clientside code to index.html. See how socket.io serves its own clientside script
* add clientside event handler that writes to console on event emitted from server
* add stdio code to server. When anything's typed on stdin, publish it to all listeners
* launch two browsers and see messages from server being published.
* re-work client so it puts messages in a <UL> element on the page instead of on console
* add textbox and button to client. WHen click button, emit an event for the server to listen for
* make server listen for event. On receiving it, publish to all listeners.
* chat chat chat!
