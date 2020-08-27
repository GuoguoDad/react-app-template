var path = require('path')
var express = require('express')
var mockjs = require('./express-mockjs')

var port = 8090
var app = express()

app.all('*', function (req, res, next) {
  // console.log("req url", req.protocol + '://' + req.headers.host + req.originalUrl)
  //res.header("Access-Control-Allow-Origin", "http://fedev.cnsuning.com:3000");
  res.header("Access-Control-Allow-Origin", req.headers.referer ? req.headers.referer.match(/^\w+\:\/\/[^\/]+/)[0] : '*');
  res.header("Access-Control-Allow-Headers", "x-requested-with,mode, accept, origin, content-type,authorization,credentials");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", "true");


  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/t', (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.sendFile(path.resolve(__dirname, './doc.html'));
  // res.send("/t")
})

app.use('/api', mockjs(path.join(__dirname, '../mocks')))

console.log(`App Mock Server running  ${port}`)
app.listen(port)
