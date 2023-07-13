const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
db.run("CREATE TABLE IF NOT EXISTS resultados(id INTEGER PRIMARY KEY, name TEXT,smash INT,pass INT)");

//Setea el notor de paginas/vistas como EJS
app.set("view engine","ejs");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//Defino donde estan los assets estaticos
app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    res.render("sop")
})

app.get("/ranking",(req,res)=>{
    res.render("ranking");
})

app.get("/registros",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY smash DESC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
})

app.get("/registros_pass",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY pass DESC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
})

app.get("/registros_alf",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY name DESC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
})


app.get("/registros_ASC",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY smash ASC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
});

app.get("/registros_pass_ASC",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY pass ASC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
});

app.get("/registros_alf_ASC",(req,res)=>{
    db.all("SELECT * FROM resultados ORDER BY name ASC", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
        res.ok = 200;
        res.send(rows);
        res.end();
    });
});




app.post("/sop",(req,res)=>{

    console.log(req.body);

    db.all("SELECT * FROM resultados", (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(rows);
    });

    db.all(`SELECT * FROM resultados where id = ${req.body.id}`, (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        //YA EXISTE EL REGISTRO
        if(rows.length > 0){
            smashes = rows[0].smash;
            passes = rows[0].pass;
            //CASO SMASH
            if(req.body.eleccion == "smash"){
                db.all(`UPDATE resultados SET smash = ${smashes + 1} WHERE id = ${req.body.id}`, (err, rows) => {
                    if (err) {
                      console.error(err.message);
                      return;
                    }
                });
            }
            //CASO PASS
            else{
                db.all(`UPDATE resultados SET pass = ${passes + 1} WHERE id = ${req.body.id}`, (err, rows) => {
                    if (err) {
                      console.error(err.message);
                      return;
                    }
                });
            }
        }
        //NO EXISTE EL REGISTRO AUN
        else{
            //CASO SMASH
            if(req.body.eleccion == "smash"){
                db.all(`INSERT INTO resultados(id,name,smash,pass) values(?,?,?,?)`,[req.body.id,req.body.name,1,0], (err, rows) => {
                    if (err) {
                      console.error(err.message);
                      return;
                    }
                });
            }
            //CASO PASS
            else{
                db.all(`INSERT INTO resultados(id,name,smash,pass) values(?,?,?,?)`,[req.body.id,req.body.name,0,1], (err, rows) => {
                    if (err) {
                      console.error(err.message);
                      return;
                    }
                });
            }
        }
    });


    res.ok = 200;
    res.send({"ok":"ok"});
    res.end();
});

app.listen(80);