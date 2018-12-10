const { resolve } = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./webpack.common.config");

const baseDir = resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "development",
  entry: [
    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "webpack-dev-server/client?http://localhost:8080",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
  ],
  devtool: "eval",
  output: {
    pathinfo: true,
    filename: "hotloader.js",
    // the output bundle
    path: resolve(baseDir, "dist"),
    publicPath: "/",
    // necessary for HMR to know where to load the hot update chunks
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    // enable HMR on the server
  },
});
