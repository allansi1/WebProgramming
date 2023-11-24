
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
res.write("<br> >> var q1 = url.parse(req.url, false); << <br>"); 

var q1 = url.parse(req.url, false);

res.write("q1.href --> " + q1.href + '<br>');
res.write("q1.path --> " + q1.path + '<br>');
res.write("q1.pathname --> " + q1.pathname + '<br>');
res.write("q1.search --> " + q1.search + '<br>');
res.write("q1.query --> " + q1.query + '<br>');    // query does not include the '?'

//================================================================================================
res.write("<br> >> var q2 = url.parse(req.url, true); << <br>"); 

var q2 = url.parse(req.url, true);

res.write("q2.href --> " + q2.href + '<br>');
res.write("q2.path --> " + q2.path + '<br>');
res.write("q2.pathname --> " + q2.pathname + '<br>');
res.write("q2.search --> " + q2.search + '<br>');
res.write("JSON.stringify(q2.query) --> " + JSON.stringify(q2.query) + '<br>'); // the parameter true in the parse makes the query  
                                                                                // portion to be converted to an object
res.write("q2.query.year --> "+ q2.query.year + '<br>')
res.write("q2.query.month --> "+ q2.query.month + '<br>')

//================================================================================================
  
res.end('<br> Au revoir');  // end the response

}).listen(8080);  // the server object listens on port 8080



//  http://localhost:8080/date/search.htm?year=2020&month=June 

//  http://user:pass@localhost:8080/p/a/t/h?year=2020&month=June#hash

