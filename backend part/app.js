const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { Router } = require('express');
const dbconnection = require('./dbserver');

const host = "localhost";
const port = 8000;

const app = express();

const Routes = require('./Router/index');
app.use(bodyparser.json());
app.options('*',cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/',Routes);

app.listen(port,host , ()=>{
    console.log(`server running on ${host}:${port}`);
});

