const { resolve } = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.config");

const baseDir = resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "production",
  entry: [
    "./index.tsx",
    // the entry point of our app
  ],
  output: {
    filename: "wallet-demo.js",
    // the output bundle
    path: resolve(baseDir, "dist"),
    publicPath: "/",
    // necessary for HMR to know where to load the hot update chunks
  },
  devtool: "inline-source-map",
});
