
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var page;
var page2;
var courseList;


http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();
  
  if ((req.url == '/scData') && (page != undefined)) {
    form.parse(req, function (err, fields, files) {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "NodeDB2",
        multipleStatements: true    // to allow multiple statements in a query
      });
      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected");

        var sql = "SET AUTOCOMMIT = OFF ;";
        // sql+= "INSERT INTO students (fam_name, giv_name) VALUES ('" + fields.user_sname + "', '" + fields.user_gname + "') ;";
        sql += "INSERT INTO students (fam_name, giv_name) VALUES (?, ?) ;";
        courseList.forEach(ligne => {
          if (fields[ligne.id]) {
            sql += "INSERT INTO enrollments(s_id, c_id) VALUES (LAST_INSERT_ID(), '" + ligne.id + "') ;"
          }
        });
        sql += "COMMIT ;"

        // con.query(sql, function (err, result) {
        con.query(sql, [fields.user_sname, fields.user_gname], function (err, result) {
          if (err) throw err;
          con.end(function (err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Database connection closed.');
            console.log(fields.user_gname + ' ' + fields.user_sname + ' data saved');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(page);
            res.write(page2);
            res.write('<script> document.getElementById("rp").innerHTML = "Data successfully saved  at <br> "+Date(); </script>');
            res.end();
          });
        });
      });
    });
  }


  if ((req.url == '/') || (page == undefined)) {
    fs.readFile("StudentCourse.html", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Not Found");
      }
      page = data;
      page2 = '<script> ';
      var con1 = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "NodeDB2"
      });
      con1.connect(function (err) {
        if (err) throw err;
        console.log("Connected");
        var sql1 = "SELECT * FROM courses";
        con1.query(sql1, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          courseList = result;
          con1.end(function (err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Database connection closed.');
            courseList.forEach(ligne => { page2 += ' add_Course("' + ligne.id + '", "' + ligne.title + '"); ' });
            page2 += ' </script>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(page);
            res.write(page2);
            return res.end();
          });  // end con1.end
        });    // end con1.query
      });  // end con1.connect    
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

  if (req.url == '/css/sc.css') {
    fs.readFile("css/sc.css", function (err, data) {
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