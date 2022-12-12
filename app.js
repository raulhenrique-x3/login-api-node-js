const express = require("express");
const mysql = require("mysql2");
const connect = require("./conexao.js");
const app = express();
const protocol = process.env.protocol || "http";
app.use(express.json());
const ip = require("ip").address();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("A API está " + "rodando neste servidor");
  res.end();
});

app.get("/users/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM users", res);
});

app.post("/users/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO users(username, password) VALUES ('" + req.body.username + "', '" + req.body.password + "')",
    res
  );
});

app.get("/users/login/:username/:password", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    `SELECT * FROM users WHERE username='${req.params.username}' AND password='${req.params.password}'`,
    res
  );
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port} or ${protocol}://${ip}:${port}`));
