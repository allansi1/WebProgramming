//Exemple_SC.js como base
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var page;
var page2;

var mysql = require('mysql');
//Variaveis List
var Rooms;
var Hotels;
var Activities;

/*var hotel = [{ id: "s_1", desc: "1 star" },
{ id: "s_2", desc: "2 stars" },
{ id: "s_3", desc: "3 stars" },
{ id: "s_4", desc: "4 stars" },
{ id: "s_5", desc: "5 stars" }
];

var room = [{ id: "single-room", desc: "Single room" },
{ id: "semi-suite", desc: "Semi-suite" },
{ id: "suite", desc: "Suite" },
{ id: "double-suite", desc: "Double suite" }
]

var acty = [{ id: "bus_tour", desc: "City-bus-tours", price: "20" },
{ id: "spa", desc: "Spa-Manage", price: "100" },
{ id: "sport", desc: "Sport Event", price: "150" },
{ id: "bike", desc: "Bike", price: "50" }
]*/

/*var w = 'family_name: ' + fields.user_sname + '\r\n' +
        'given_name: ' + fields.user_gname + '\r\n' +
        'sex: ' + fields.user_sex + '\r\n' +
        'num_visitors: ' + fields.s_box_number + '\r\n' +
        'duration: ' + fields.s_box_duration + '\r\n' +
        'hotel_stars: ' + fields.s_box_hotel + '\r\n' +
        'room_type: ' + fields.s_box_rtype + '\r\n' +
        'activities: ';
      acty.forEach(ligne => { w = w + (fields["c_" + ligne.id] ? ligne.id + ' ' : ''); });
      w = w + '\r\n------------\r\n';*/


http.createServer(function (req, res) {
  var form = new formidable.IncomingForm();

  if ((req.url == '/mtData') && (page != undefined)) { //condição para verificar se a rota é "/mtData"
    //e se page não definido
    form.parse(req, function (err, fields, files) {
      //analise dos dados do form => 
      //parse = 2 argumentos (req, função anonima de callback com 3 parametros)


      //parâmetro de conexão da base de dados
      var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mtdb1",
        multipleStatements: true
      });

      connect.connect(function (err) {
        if (err) throw err;
        console.log("Connected");

        var sql = "SET AUTOCOMMIT = OFF;"; //desativa a autoconfirmação de transações

        sql += "INSERT INTO visitors (fam_name, giv_name, sex, num_perso, num_days, hotel_type, room_type) VALUES (?,?,?,?,?,?,?);";
        //(?) = requete paramétrica para evitar sql injection
        Activities.forEach(ligne => {
          if (fields["c_" + ligne.id_act]) {
            sql += "INSERT INTO enrollments(id_v, id_act) VALUES (LAST_INSERT_ID(), '" + ligne.id_act + "') ;"
          }
        })

        sql += "COMMIT;";

        // con.query(sql, function (err, result) {
        //insere na consulta os valores em array na tabela Visitors
        connect.query(sql, [fields.user_sname, fields.user_gname, fields.user_sex,
        fields.s_box_number, fields.s_box_duration, fields.s_box_hotel,
        fields.s_box_rtype], function (err, result) {
          if (err) throw err;
          connect.end(function (err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Database disconnected');
            console.log(fields.user_gname + ' ' + fields.user_sname + ' datas saved in the database');
            res.writeHead(200, { 'Content-Type': 'text/html' });//codigo 200 = bem-sucedida
            res.write(page);
            res.write(page2);
            res.write('<script> document.getElementById("rp").innerHTML = "Data successfully saved  at <br> "+Date(); </script>');
            res.end();
          });
        });
      });
    });


  }

  if ((req.url == '/') || (page == undefined)) { // "/" = raiz do HTML
    fs.readFile("MontrealTourism.html", function (err, data) { // lê a página HTML
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Not Found");
      }
      page = data;
      page2 = '<script> ';
      var connect1 = mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "root",
          database: "mtdb1"
        }
      );
      //Le as 3 tabelas no banco de dados através do "SELECT *"
      connect1.connect(function (err) {
        if (err) throw err;
        console.log("Connected");
        var sql1 = "SELECT * FROM hotel";
        connect1.query(sql1, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          Hotels = result;
        })
        var sql1 = "SELECT * FROM room";
        connect1.query(sql1, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          Rooms = result;
        })
        var sql1 = "SELECT * FROM activities";
        connect1.query(sql1, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          Activities = result;
          connect1.end(function (err) {
            if (err) {
              return console.log("error" + err.message);
            }
            console.log('Database connection closed.');
            //Percorre os arrays (que contém os dados do BD) para ser exibido no HTML
            Hotels.forEach(ligne => { page2 += ' add_Hotel_type("' + ligne.id_ht + '", "' + ligne.desc_ht + '"); ' });
            Rooms.forEach(ligne => { page2 += ' add_Room_type("' + ligne.id_rt + '", "' + ligne.desc_rt + '"); ' });
            Activities.forEach(ligne => { page2 += ' add_Activity("' + ligne.id_act + '", "' + ligne.desc_act + '", "' + ligne.price + '"); ' });
            page2 += ' </script>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(page);
            res.write(page2);
            return res.end();
          })
        })
      });

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