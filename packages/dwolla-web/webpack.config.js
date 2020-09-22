const path = require("path");
const { merge } = require("webpack-merge");
const S3Plugin = require("webpack-s3-plugin");

const config = (name, override = {}) =>
  merge(
    {
      entry: "./src/dwolla-web.js",
      output: {
        path: path.resolve(__dirname, "dist/" + name),
        filename: "dwolla-web.js",
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

const CDN_PUBLISH_PATH = process.env.CDN_PUBLISH_PATH;
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

module.exports = [
  config("browser", {
    output: {
      publicPath: CDN_PUBLISH_PATH || "/",
    },
    plugins: CDN_PUBLISH_PATH
      ? [
          new S3Plugin({
            directory: "dist/browser",
            basePath: "v2-alpha",
            s3Options: {
              region: AWS_REGION,
            },
            s3UploadOptions: {
              Bucket: S3_BUCKET,
              ACL: "public-read",
              CacheControl: "public, max-age=1800",
            },
            cdnizerConfig: {
              defaultCDNBase: "https://cdn.dwolla.com",
            },
          }),
        ]
      : [],
  }),
  config("npm", { output: { libraryTarget: "commonjs2" } }),
];
