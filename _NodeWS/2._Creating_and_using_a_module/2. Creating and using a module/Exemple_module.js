
var http = require('http');
var dt = require('./mymodule1');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write("<br> My name is "+ dt.myName());
  res.end();
}).listen(8080); 