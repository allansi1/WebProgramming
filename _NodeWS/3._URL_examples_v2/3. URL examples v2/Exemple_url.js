
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'}); // status code 200 (OK), JS object containing the response headers.

  res.write("req.headers.host = " + req.headers.host +'<br>');

  res.write("req.url = " + req.url+'<br>'); // req argument that represents the request from 
                                            // the client, as an object (http.IncomingMessage object).
                                            // property "url" holds the part of the url that comes 
                                            // after the domain name.

//================================================================================================

  res.write("<br> >> var q1 = url.parse(req.url, false).query; << <br>"); 

  var q1 = url.parse(req.url, false).query;     // parse la partie the l'url apr�s le nom du domaine 
                                                // en retirant le ? et tout qui vient avant

    res.write("q1 --> " + q1 + '<br>');

//================================================================================================

  res.write("<br> >> var q2 = url.parse(req.url, true); << <br>");  

  var q2 = url.parse(req.url, true);     
  
  res.write("q2.pathname --> "+ q2.pathname +'<br>');
  res.write("q2.search --> "+ q2.search +'<br>');

//=================================================================================================

  res.write("<br> >> var q3 = q2.query; << <br>");
  
  var q3= q2.query;
  
  res.write("q2.query.year --> "+ q3.year + '<br>')
  res.write("q2.query.month --> "+ q3.month + '<br>')
  
  res.end('<br> Au revoir');  // end the response

}).listen(8080);  // the server object listens on port 8080



//  http://localhost:8080/search.htm?year=2020&month=June 