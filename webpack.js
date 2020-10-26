const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
console.log(__dirname);
module.exports = {
  target: "electron-main",

  entry: "./main.js",

  output: {
    path: path.join(__dirname, "build"),
    filename: "./index.js",
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "native-ext-loader",
        options: {
          rewritePath: path.resolve(__dirname, "build"),
        },
      },
    ],
  },
};
