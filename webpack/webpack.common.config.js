const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseDir = resolve(__dirname, "..");

module.exports = {
  context: resolve(baseDir, "src"),
  entry: [
    "./index.tsx",
    // the entry point of our app
    "webpack-dev-server/client?http://localhost:8080",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
  ],
  output: {
    filename: "hotloader.js",
    // the output bundle
    path: resolve(baseDir, "dist"),
    publicPath: "/",
    // necessary for HMR to know where to load the hot update chunks
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)?$/,
        loader: "tslint-loader",
        exclude: [resolve(__dirname, "node_modules")],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: [resolve(__dirname, "node_modules")],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // TODO: not sure any of the below are optimal, just copied from another project
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new HtmlWebpackPlugin({ template: resolve(baseDir, "src/index.html") }),
    // inject <script> in html file.
  ],

  devServer: {
    port: "8080",
    // Change it if other port needs to be used
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
};