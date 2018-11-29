// webpack-config.js
const config = require("config");
const fs = require("fs");
const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const baseDir = resolve(__dirname, "..");
// taken from: https://github.com/lorenwest/node-config/wiki/Webpack-Usage#option-3
const configFile = resolve(baseDir, "build", "client.json");
fs.writeFileSync(configFile, JSON.stringify(config));

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const cssvariables = require(baseDir + "/src/theme/variables.js");

const autoprefixer = require("autoprefixer");
const cssmixins = require("postcss-mixins");
const cssvars = require("postcss-simple-vars");

const postcssPlugins = [
  cssmixins,
  cssvars({
    variables: function() {
      return Object.assign({}, cssvariables);
    },
    silent: false,
  }),
  require("postcss-flexbugs-fixes"),
  require("postcss-preset-env")({
    autoprefixer: {
      flexbox: "no-2009",
    },
    stage: 3,
  }),
];

module.exports = {
  context: resolve(baseDir, "src"),
  entry: [
    "./index.tsx",
    // the entry point of our app
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      config: configFile,
      '~': resolve(__dirname, "..", "src"),
    },
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
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              minimize: false,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: postcssPlugins,
            },
          },
        ],
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
    // prints more readable module names in the browser console on HMR updates
    new HtmlWebpackPlugin({ template: resolve(baseDir, "src/index.html") }),
    // inject <script> in html file.
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) }),
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
