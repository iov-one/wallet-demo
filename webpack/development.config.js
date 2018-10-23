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
  ],
  devtool: "inline-source-map",
  output: {
    filename: "hotloader.js",
    // the output bundle
    path: resolve(baseDir, "dist"),
    publicPath: "/",
    // necessary for HMR to know where to load the hot update chunks
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
  devServer: {
    hot: true,
    // enable HMR on the server
  },
});
