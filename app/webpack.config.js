"use strict";

const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./public/src/js/app.js",
  output: {
    path: path.join(__dirname, "./public/dist/js"),
    publicPath: "js/",
    filename: "main.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"],
          plugins: [
            ["transform-object-rest-spread"]
          ]
        }
      }
    ]
  }
};
