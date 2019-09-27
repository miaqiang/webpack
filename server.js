const express = require('express')
const proxy = require('http-proxy-middleware');
const path = require('path')
const port = 8082
const app = express()

//4.1.0.0
var target = 'http://demo220.test.com:8089';
var target = "http://demo312.test.com:8070";
var target = "http://demo188.test.com:8070";
// serve static assets normallyroles/delete
//镜宇
//var target = 'http://10.109.16.156:8089';//vm41.leap.com 开发环境
//var target='http://10.109.4.93:8070';//vm41.leap.com 开发环境
//var target = "http://vm31.leap.com:8070";
//var target="http://10.109.4.93:8089";
app.use(express.static(__dirname + '/'))



// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
const broserHistory = true;

app.use('/', proxy({ target: target }));

/*if(broserHistory)
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'dev.html'))
  })*/

app.listen(port)
console.log("hello world", __dirname);
console.log("server started on port " + port)