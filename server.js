const express = require('express')
const proxy = require('http-proxy-middleware');
const path = require('path')
const port = 3002
const app = express()

//3480
// var target = 'http://demo189.test.com:8089';

let target='http://10.109.23.159:8083';//小明电脑
// serve static assets normallyroles/delete


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(express.static(__dirname + '/'))



// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
const broserHistory = true;

app.use('/', proxy({target: target}));

/*if(broserHistory)
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'dev.html'))
  })*/

app.listen(port)
console.log("hello world",__dirname);
console.log("server started on port " + port)