const path = require("path");
const merge = require("deepmerge");

const config = (name, override = {}) =>
  merge(
    {
      entry: "./src/dwolla-react.js",
      output: {
        path: path.resolve(__dirname, "dist/" + name),
        filename: "dwolla-react.js",
      },
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
    },
    override
  );

module.exports = [
  config("browser"),
  config("npm", { output: { libraryTarget: "commonjs2" } }),
];
