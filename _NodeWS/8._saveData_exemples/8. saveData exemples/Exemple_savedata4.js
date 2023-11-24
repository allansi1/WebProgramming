
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var page;

http.createServer(function (req, res) {
  var form = new formidable.IncomingForm(); 
  if ((req.url == '/nom_email')&&(page != undefined)) {
    form.parse(req, function (err, fields, files) {
      fs.appendFile('mesdonnees.txt', fields.name +'\r\n', function (err) { 
        if (err) throw err;
        console.log(fields.name + ' saved in mesdonnes.txt');
        fs.appendFile('mesdonnees.txt', fields.email +'\r\n', function (err) {
          if (err) throw err;
          console.log(fields.email + ' saved in mesdonnes.txt');
          fs.appendFile('mesdonnees.txt', '----------- \r\n', function (err) {
            if (err) throw err;
            console.log('Separator saved in mesdonnes.txt'); 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);                 
            res.write('<script> document.getElementById("rp").innerHTML = "Data successfully saved at "+Date(); </script>');            
            res.end();
          });
        });
      });       
    });
  } else {
    fs.readFile("index4.html", function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      page = data;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
   }
}).listen(8080); 