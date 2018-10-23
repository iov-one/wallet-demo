const { resolve } = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./webpack.common.config");

const baseDir = resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "./index.tsx",
    // the entry point of our app
  ],
  output: {
    filename: "hotloader.js",
    // the output bundle
    path: resolve(baseDir, "dist"),
    publicPath: "/",
    // necessary for HMR to know where to load the hot update chunks
  },
  devtool: "inline-source-map",
  devServer: {
    port: "8080",
    // Change it if other port needs to be used
    hot: true,
    // enable HMR on the server
    noInfo: true,
    quiet: false,
    // minimize the output to terminal.
    contentBase: resolve(baseDir, "dist"),
    // match the output path
    publicPath: "/",
    // match the output `publicPath`,
    historyApiFallback: true,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
