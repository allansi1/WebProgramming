var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
 
  if (req.url != '/favicon.ico'){ 
 
  //create a file named myfile2.txt:
  fs.appendFile('myfile2.txt', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('String saved in myfile2.txt');
  });

  //create an empty file named myfile3.txt 
  fs.open('myfile3.txt', 'w', function (err, file) {
    if (err) throw err;    
    console.log('myfile3.txt created empty');
    fs.close(file, function (err, file) {
      if (err) throw err;    
    });
  }); 
  
  //create a file named myfile4.txt:
  fs.writeFile('myfile4.txt', 'Hello Folks!', function (err) {
    if (err) throw err;
    console.log('myfile4.txt created');
  }); 

  }

  console.log("url = "+req.url);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Done");
  res.end();
 
}).listen(8080);