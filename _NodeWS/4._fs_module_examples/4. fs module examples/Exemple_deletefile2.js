
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  if (req.url != '/favicon.ico') {

    //Delete the file myfile_d.txt:
    fs.unlink('fileToBeDeleted.txt', function (err) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (err) 
      { 
        console.log('File not found'); 
        res.write("Not Found"); 
      }
      else 
      { 
        console.log('File deleted!'); 
        res.write("Done"); 
      }
      res.end();
    });    
  }
  console.log("req.url = " + req.url);
}).listen(8080);