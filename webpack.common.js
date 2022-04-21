// Common Module
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/main.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: "/.(js|jsx)$/",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "images",
          name: "[name].[hash].[ext]"
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "ahmed",
      template: "./src/index.html"
    })
  ],
};
