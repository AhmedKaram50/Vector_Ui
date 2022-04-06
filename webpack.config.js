// Common Module
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "app3.[contenthash].js",
    path: path.resolve(__dirname, "dist/"),
  },
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
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
