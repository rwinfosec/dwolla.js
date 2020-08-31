const path = require("path");

module.exports = {
  entry: "./src/dwolla.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dwolla.js",
    // libraryTarget: "commonjs2",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
