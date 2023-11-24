
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var page;

http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();
  if ((req.url == '/nom_email') && (page != undefined)) {
    form.parse(req, function (err, fields, files) {
      fs.appendFile('mesdonnees.txt', fields.name + '\r\n', function (err) {
        if (err) throw err;
        console.log(fields.name + ' saved in mesdonnes.txt');
        fs.appendFile('mesdonnees.txt', fields.email + '\r\n', function (err) {
          if (err) throw err;
          console.log(fields.email + ' saved in mesdonnes.txt');
          fs.appendFile('mesdonnees.txt', '----------- \r\n', function (err) {
            if (err) throw err;
            console.log('Separator saved in mesdonnes.txt');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(page);
            res.write('<script> document.getElementById("rp").innerHTML = "Data successfully saved  at <br> "+Date(); </script>');
            res.end();
          });
        });
      });
    });
  } 

  if (req.url=='/') {
    fs.readFile("index5.html", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Not Found");
      }
      page = data;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }

  if (req.url == '/css/reset.css') {
    fs.readFile("css/reset.css", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/css' });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
  }

  if (req.url == '/css/savedata.css') {
    fs.readFile("css/savedata.css", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/css' });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
  }

}).listen(8080); 