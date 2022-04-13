// Common Module
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: "/.(js|jsx)$/",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "ahmed",
      template: "./src/index.html"
    })
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, "src"),
  // },
};
