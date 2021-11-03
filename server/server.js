var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer();
server.listen(8080);

// create the server
wsServer = new WebSocketServer({
  // You must specify an httpServer on which to mount the WebSocket server.
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  
  console.log('WebSocket Connected !');

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log('message received:', message.utf8Data)
  });

  connection.on('close', function(connection) {
    // close user connection
    console.log('WebSocket closed !');
  });
});