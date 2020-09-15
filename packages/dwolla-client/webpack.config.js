const path = require("path");
const merge = require("deepmerge");

const config = (name, override = {}) =>
  merge(
    {
      entry: "./src/dwolla-client.js",
      output: {
        path: path.resolve(__dirname, "dist/" + name),
        filename: "dwolla-client.js",
      },
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
    },
    override
  );

module.exports = config("npm", { output: { libraryTarget: "commonjs2" } });
