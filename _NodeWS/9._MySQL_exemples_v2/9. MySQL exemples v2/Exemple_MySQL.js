
var http = require('http');
var url = require('url');
var mysql = require('mysql');

http.createServer(function (req, res) {
  var q2 = url.parse(req.url, true);
  var comm = q2.pathname;
  var q3 = q2.query;

  if (comm == "/createdb") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      con.query("CREATE DATABASE IF NOT EXISTS NodeDB1", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/createtable") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/insert") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      var sql = "INSERT INTO customers (name, address) VALUES ('" + q3.name + "', '" + q3.address + "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/list") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      var sql = "SELECT * FROM customers";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/updateaddress") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      var sql = "UPDATE customers SET address = '" + q3.address + "' WHERE name = '" + q3.name + "'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/delete") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      if (q3.name !== undefined) {
        if (q3.address !== undefined) {
          var sql = "DELETE FROM customers WHERE name = '" + q3.name + "' AND address = '" + q3.address + "'";
        }
        else {
          var sql = "DELETE FROM customers WHERE name = '" + q3.name + "'";
        }
      }
      else {  //  q3.name ===undefined
        if (q3.address !== undefined) {
          var sql = "DELETE FROM customers WHERE address = '" + q3.address + "'";
        }
        else {
          var sql = null
        }
      }
      if (sql !== null) {
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
          con.end(function (err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Database connection closed.');
          });
        });
      }
    });
  }

  if (comm == "/droptable") {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "NodeDB1"
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
      var sql = "DROP TABLE customers";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Table deleted');
        con.end(function (err) {
          if (err) {
            return console.log('error:' + err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  }

  if (comm == "/favicon") { }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write ('<head> <meta charset="utf-8" /> </head>')
  res.write("Done")
  res.write('<script> console.log("OK") </script>')  // writing to the front-end (client) console
  res.end('<br> Au revoir');  // end the response


}).listen(8080);  // the server object listens on port 8080

// http://localhost:8080/createdb
// http://localhost:8080/createtable
// http://localhost:8080/insert?name=Mary&address=Montreal
// http://localhost:8080/insert?name=Anne&address=Montreal
// http://localhost:8080/insert?name=Mary Brown&address=Montreal 
// http://localhost:8080/insert?name=Mary%20Smith&address=Montreal   // on peut utiliser %20 ou blank 
// http://localhost:8080/list
// http://localhost:8080/updateaddress?name=Mary%20Smith&address=Quebec%20city
// http://localhost:8080/delete?name=Anne
// http://localhost:8080/droptable