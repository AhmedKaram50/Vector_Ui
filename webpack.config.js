// Common Module
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "app2.js",
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
