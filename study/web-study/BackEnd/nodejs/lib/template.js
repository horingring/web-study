module.exports = {
  HTML: function (title, list, body, controll) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB - ${title === undefined ? "Welcome" : title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${controll}
        ${body}
      </body>
      </html>
      `;
  },
  list: function (filelist) {
    var list = `<ul>`;
    for (var i = 0; i < filelist.length; i++) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + `</ul>`;
    return list;
  },
};
