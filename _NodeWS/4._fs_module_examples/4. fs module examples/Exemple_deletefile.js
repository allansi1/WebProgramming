
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  if (req.url != '/favicon.ico') {

    //Delete the file myfile_d.txt:
    fs.unlink('fileToBeDeleted.txt', function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Done");
    res.end();
  }
  console.log("req.url = " + req.url);
}).listen(8080);