
var http = require('http');
var formidable = require('formidable');
var mv =require('mv');
var fs = require('fs');

http.createServer(function (req, res) {
  var form = new formidable.IncomingForm(); 
  //form.uploadDir='tmp_upload';   // It will use the default: C:\Users\<user>\AppData\Local\Temp\
  if (req.url == '/fileupload') {    
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;  
      console.log(oldpath);
      var newpath = './uploaded/' + files.filetoupload.name;
      //fs.rename(oldpath, newpath, function (err) {    // rename can move the file
      mv(oldpath, newpath, function (err) {    
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
  });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 