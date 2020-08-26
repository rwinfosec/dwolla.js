const path = require("path");
const merge = require("deepmerge");

const config = (name, override = {}) =>
  merge(
    {
      entry: "./src/dwolla-components.js",
      output: {
        path: path.resolve(__dirname, "dist/" + name),
        filename: "dwolla-components.js",
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
    },
    override
  );

module.exports = [
  config("browser"),
  config("npm", { output: { libraryTarget: "commonjs2" } }),
];
