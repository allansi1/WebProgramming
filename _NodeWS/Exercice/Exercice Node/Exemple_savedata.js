var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/nom_email') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields) {

            var userData = 'Name: ' + fields.name + ', Email: ' + fields.email + '\n';

            fs.appendFile('mydata.txt', userData, function (err) {
                if (err) throw err;
                res.write('User data saved in mydata.txt');
                res.end();
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