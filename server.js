var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    root = __dirname + '/public', //magic var
    mime = require('mime');


  //Server
var server = http.createServer(function (req, res) {
  // Check is root is queried
  var fileName = '';
  var url = req.url;
  if (url === '/'){
    url = '/index.html'; // redirect when no file specified
  }
  fileName = root + url;



  // check if file exists
  fs.exists(fileName, function(exists){
    if (exists) {
      serveFile(fileName); // yes
    } else {
      path = root + '/404.html'; //no
      serveFile(path);
    }
  })
  //serve file
  function serveFile(requestFile) {
    // maak a stream based on events
    var stream = fs.createReadStream(requestFile);
    res.writeHead(200, {'Content-Type': mime.lookup(requestFile)});
    stream.on('data', function (chunk){
      res.write(chunk);
    });
    stream.on('end', function(){
      res.end();
    });
    stream.on('error', function(err){
      console.log('error: '+ err);
    });
  }
});


server.listen(3000); //server start
console.log('Server gestart op http://localhost:3000 ');
