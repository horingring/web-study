var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template");
var path = require("path");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  console.log(url.parse(_url, true));

  if (pathname === "/") {
    fs.readdir("./data", function (err, filelist) {
      var filteredPath = path.parse(`${queryData.id}`).base;
      fs.readFile(`data/${filteredPath}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
            <h2>${queryData.id === undefined ? "Welcome" : title}</h2>
            <p>
            ${queryData.id === undefined ? "Hello, Node.js" : description}
            </p>
          `,
          `
            ${
              queryData.id === undefined
                ? ""
                : `
                <a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="/delete_process" method="post">
                  <input type="hidden" name="id" value=${title} />
                  <input type="submit" value="delete"></input>
                </form>
              `
            }
          `
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var filteredPath = path.parse(`${queryData.id}`).base;
      fs.readFile(`data/${filteredPath}`, "utf8", function (err, description) {
        var title = "WEB - Create";
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
            <form
              action="/create_process"
              method="post"
            >
              <p>
                <input type="text" name="title" placeholder="title" />
              </p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit" />
              </p>
            </form>
          `,
          ""
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/create_process") {
    var body = "";
    //웹 브라우저로부터 전송된 post 데이터를 조각조각 받는 로직
    request.on("data", function (data) {
      body = body + data;
    });
    // 모든 post데이터를 받았을 때 실행되는 로직
    request.on("end", function () {
      var post = qs.parse(body);
      console.log(post);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        //리다이렉션
        response.writeHead(302, {
          Location: `/?id=${title}`,
        });
        response.end("success");
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (err, filelist) {
      var filteredPath = path.parse(`${queryData.id}`).base;
      fs.readFile(`data/${filteredPath}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
            <form
              action="/update_process"
              method="post"
            >
              <input type="hidden" name="id" value=${title} />
              <p>
                <input type="text" name="title" placeholder="title" value=${title} />
              </p>
              <p>
                <textarea name="description" placeholder="description">
                  ${description}
                </textarea>
              </p>
              <p>
                <input type="submit" />
              </p>
            </form>
          `,
          ""
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function (err) {
      var post = qs.parse(body);
      console.log(post);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`./data/${id}`, `./data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, {
            Location: `/?id=${title}`,
          });
          response.end("success");
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function (err) {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`./data/${filteredId}`, function (err) {
        response.writeHead(302, {
          Location: "/",
        });
        response.end("success");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
