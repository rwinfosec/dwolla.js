const path = require("path");

module.exports = {
  entry: "./src/dwolla-react.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dwolla-react.js",
    libraryTarget: "commonjs2",
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    // alias: {
    //   react: path.resolve("node_modules/react"),
    //   "react-dom": path.resolve("node_modules/react-dom"),
    // },
  },
  externals: {
    react: { commonjs2: "react" },
    "react-dom": { commonjs2: "react-dom" },
  },
};
