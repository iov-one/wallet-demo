const path = require("path");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("ts-loader"),
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: 100000,
            },
          },
        ],
      },
    ],
  },
  plugins: [new TSDocgenPlugin()],
  resolve: {
    extensions: [".ts", ".tsx"],
  },
};
