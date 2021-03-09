var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  console.log(url.parse(_url, true));

  if (pathname === '/') {
    fs.readdir('./data', function(err, filelist) {
      var list = `<ul>`;
      for (var i = 0; i < filelist.length; i++) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      }
      list = list + `</ul>`;

      fs.readFile(`data/${title}`, 'utf8', function(err, description) {
        var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${queryData.id===undefined?'Welcome':title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${queryData.id===undefined?'Welcome':title}</h2>
            <p>
            ${queryData.id===undefined?'Hello, Node.js':description}
            </p>
          </body>
          </html>
          `;
        response.writeHead(200);
        response.end(template);
      });
    });



  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);
