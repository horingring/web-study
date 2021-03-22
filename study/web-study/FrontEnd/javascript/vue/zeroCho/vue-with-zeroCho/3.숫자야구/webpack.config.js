const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");

module.exports = {
  mode: 'development',  //개발용. (*배포는 production)
  devtool: 'eval',  //개발용. (*배포는 hidden-source-map)
  resolve: {
    extensions: ['.js', '.vue'], //확장자를 처리해줌
  },
  entry: {
    app: path.join(__dirname, "main.js"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    filename: "[name].js",
    //path.join(__dirname)은 현재 디렉토리의 절대경로를 return한다.
    path: path.join(__dirname, "dist"), 
  },
};
