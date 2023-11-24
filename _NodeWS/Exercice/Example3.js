var http = require('http')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Hello World! 2<br/>");
    res.write("The date and time are currently:" + Date());
    res.write("Bonjour Thais:" + Date());
    res.end();

}).listen(8080);