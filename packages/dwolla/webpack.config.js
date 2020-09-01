const path = require("path");
const merge = require("deepmerge");
const S3Uploader = require("webpack-s3-uploader");

const config = (name, override = {}) =>
  merge(
    {
      entry: "./src/dwolla.js",
      output: {
        path: path.resolve(__dirname, "dist/" + name),
        filename: "dwolla.js",
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

module.exports = [
  config("browser", {
    output: {
      publicPath: process.env.CDN_PUBLIC_PATH || "/",
    },
    plugins: process.env.CDN_PUBLIC_PATH
      ? [
          new S3Uploader({
            basePath: "alpha",
            s3Options: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: process.env.AWS_REGION,
            },
            s3UploadOptions: {
              Bucket: process.env.S3_BUCKET,
            },
          }),
        ]
      : [],
  }),
  config("npm", { output: { libraryTarget: "commonjs2" } }),
];
