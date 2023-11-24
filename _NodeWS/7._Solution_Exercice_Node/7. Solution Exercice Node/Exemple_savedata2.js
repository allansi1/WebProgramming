
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();
  if (req.url == '/nom_email') {
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
            res.write('<h3> Data sucessfully submitted </h3>');
            res.end();
          });
        });
      });       
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h2>Exercice Node</h2>');
    res.write('<form action="nom_email" method="post" enctype="multipart/form-data">');
    res.write('Name: <input type="text" name="name"><br>');
    res.write('E-mail: <input type="text" name="email"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 