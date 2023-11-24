
var http = require('http');
http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'}); // status code 200 (OK), JS object containing the response headers.

  res.write('Hello World!<br>');  // write a response to the client

  res.write(req.url+'<br>'); // req argument that represents the request from the client, as an object (http.IncomingMessage object).
                      // property "url" holds the part of the url that comes after the domain name.

  res.end('Au revoir');  // end the response

}).listen(8080);  // the server object listens on port 8080 