
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  if (req.url != '/favicon.ico'){ 
 
  //Rename the file "filetoberenamed.txt" into "filerenamed.txt":
  fs.rename('filetoberenamed.txt', 'filerenamed.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
  });
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Done");
  res.end();
  }
  console.log("req.url = " + req.url); 
}).listen(8080);