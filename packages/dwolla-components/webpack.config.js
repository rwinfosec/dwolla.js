const path = require("path");

module.exports = {
  entry: "./src/dwolla-components.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dwolla-components.js",
    // libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js"],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ["@babel/preset-env"],
  //         },
  //       },
  //     },
  //   ],
  // },
};
