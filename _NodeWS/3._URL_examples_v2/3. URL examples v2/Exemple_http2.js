
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'}); // status code 200 (OK), JS object containing the response headers.

  res.write('Hello World!<br>');  // write a response to the client

  res.write(req.url+'<br>'); // req argument that represents the request from the client, as an object (http.IncomingMessage object).
                      // property "url" holds the part of the url that comes after the domain name.

  var q1 = url.parse(req.url, false).query;     // parse la partie the l'url apr�s le nom du domaine en retirant le ? et tout qui vient avant

  res.write(q1+'<br>');

  var q2 = url.parse(req.url, true).query;     // parse la partie the l'url apr�s le nom du domaine en retirant le ? et tout qui vient avant
                                               // et, ensuite, interpr�te le restant comme un objet JavaScript.
  var txt = q2.year + " " + q2.month;

  res.write(txt+'<br>');

  res.end('Au revoir');  // end the response

}).listen(8080);  // the server object listens on port 8080



//http://localhost:8080/?year=2020&month=June 