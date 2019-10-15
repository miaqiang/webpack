// import { target } from './src/config/base'

const express = require('express')
const proxy = require('http-proxy-middleware');
const path = require('path');
//const target = require('./src/config/base');
const port = 8081;
const app = express();


//4.1.0.0

app.use(express.static(__dirname + '/'))

var target = "http://vm31.leap.com:8070";

const broserHistory = true;

app.use('/', proxy({ target: target }));



app.listen(port)
console.log("hello world", __dirname);
console.log("server started on port " + port)