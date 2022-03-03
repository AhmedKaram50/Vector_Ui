// Common Module
const path = require("path");

module.exports = {
  entry: "./src/js/helpers.js",
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: "/.(js|jsx)$/",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
