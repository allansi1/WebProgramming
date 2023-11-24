
var http = require('http');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var page;

http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();
  if ((req.url == '/mtData') && (page != undefined)) {
    form.parse(req, function (err, fields, files) {
      fs.appendFile('mt.txt',
        'name: ' + fields.user_name + '\r\n' +
        'sex: ' + fields.user_sex + '\r\n' +
        'num_visitors: ' + fields.s_box_number + '\r\n' +
        'duration: ' + fields.s_box_duration + '\r\n' +
        'hotel_stars: ' + fields.s_box_hotel + '\r\n' +
        'room_type: ' + fields.s_box_rtype + '\r\n' +
        'activities: ' + (fields.c_bus_tour ? 'bus-tour ' : '') +
           (fields.c_spa ? 'spa ' : '') +
           (fields.c_sport ? 'sport ' : '') + '\r\n' +
        '----------- \r\n',
        function (err) {
          if (err) throw err;
          console.log(fields.user_name + ' data saved in mt.txt');
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(page);
          res.write('<script> document.getElementById("rp").innerHTML = "Data successfully saved  at <br> "+Date(); </script>');
          res.end();
        });
    });
  }

  if ((req.url == '/') || (page == undefined)) {
    fs.readFile("MontrealTourism3.html", function (err, data) {
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

/*if (req.url == '/css/reset.css') {
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

  if (req.url == '/css/mt.css') {
    fs.readFile("css/mt.css", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/css' });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
  }*/

  var action= url.parse(req.url, true).pathname.split("/")[1];
  var ct;  
  if (action=='css'){ ct ='text/css'; }
  if (action=='js'){ ct='text/javascript'; }
  if (( action == 'css')|| (action=='js')) {
    fs.readFile("."+req.url, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': ct});
        return res.end("404 Not Found");
      }
      res.writeHead(200, { 'Content-Type': ct });
      res.write(data);
      return res.end();
    });
  }

  if (req.url == "/icon/mt3-32.png") {
    fs.readFile("."+req.url, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(data);
      return res.end();
    });
  }

}).listen(8080); 