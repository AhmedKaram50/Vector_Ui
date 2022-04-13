// Common Module
const path = require("path");
const {merge} = require("webpack-merge");
const common = require("./webpack.common")


module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "application.js",
    path: path.resolve(__dirname, "dist/"),
  },
});
