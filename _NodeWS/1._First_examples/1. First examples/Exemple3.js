
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello World!! <br/>");
    res.write("The date and time are currently: " + Date());
    res.end(); 
}).listen(8090); //Attention: Port 8090 to be possible to execute in parallel to Exemple2.js 