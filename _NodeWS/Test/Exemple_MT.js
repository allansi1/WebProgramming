
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require(`mysql`);
var listHotel;
var listSalle;
var listActivite;
var page;
var page2;


http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();
  
  if ((req.url == '/mtData') && (page != undefined)) {
    form.parse(req, function (err, fields, files) {
     var con = mysql.createConnection(
       {
         host:"localhost", 
         user:"root",
         password:"root",
         database: "mtdb1",
         multipleStatements: true
       }
     );

     con.connect(function(err){
       if(err)throw err;
       console.log("Connected/Updated");

       var sql = "SET AUTOCOMMIT = off;";

       sql += "INSERT INTO visitors (fam_name, giv_name, sex , num_perso , num_days , hotel_type, room_type )"
       sql += "VALUES (?,?,?,?,?,?,?);";
       
       listActivite.forEach(ligne => {
        if (fields["c_"+ligne.id_act]) {
          sql += "INSERT INTO enrollments(id_v, id_act) VALUES (LAST_INSERT_ID(), '" + ligne.id_act + "') ;"
        }
      });
       sql += "COMMIT;";
  
      con.query(sql, [fields.user_sname, fields.user_gname, fields.user_sex, fields.s_box_number, 
      fields.s_box_duration, fields.s_box_hotel, fields.s_box_rtype], 
      function (err, result) {
        if (err) throw err;
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }           
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
    fs.readFile("TMontreal.html", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Not Found");
      }
      page = data;
      page2 = '<script> ';
      var con = mysql.createConnection(
        {
          host:"localhost", 
          user:"root",
          password:"root",
          database: "mtdb1"
        }
      );
        con.connect (function (err) {
          if(err) throw err;
          var sql1="select  * from hotel";
          con.query(sql1, function(err, result, fields){
          if(err) throw err;
          listHotel = result;
          })
          var sql1="select  * from room";
          con.query(sql1, function(err, result, fields){
          if(err) throw err;
          listSalle = result;
          })
          var sql1="select  * from activities";
          con.query(sql1, function(err, result, fields){
          if(err) throw err;
          listActivite = result;
          con.end(function (err) {
            if(err) {
              return console.log ("erreur");
            }
            listHotel.forEach(ligne=> {page2+=' add_Hotel_type("'+ligne.id_ht+'", "'+ligne.desc_ht+'"); ' });       
            listSalle.forEach(ligne => {page2+= ' add_Room_type("'+ ligne.id_rt+'", "'+ligne.desc_rt+'"); '});   
            listActivite.forEach(ligne => { page2 += ' add_Activity("' + ligne.id_act + '", "' + ligne.desc_act + '", "' + ligne.price + '"); ' }); 
            page2 += ' </script>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.write(page2);
            return res.end(); 
          })
          })
        })
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
  }

}).listen(8080); 