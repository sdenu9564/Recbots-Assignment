
const express = require("express");
const app = express()
const mysql = require("mysql")
// const bcrypt = require("bcrypt")
// app.use(express.json());
const db = mysql.createPool({
   connectionLimit: 100,
   host: "127.0.0.1",       //This is your localhost IP
   user: "newuser",         // "newuser" created in Step 
   password: "password1#",  // password for the new user
   database: "userdb",      // Database name
   port: "3306"             // port name, "3306" by default
})
db.getConnection( (err, connection)=> {
   if (err) return (err)
   console.log ("DB connected successful: " + connection.threadId)
})
module.exports = db;
