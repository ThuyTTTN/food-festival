const path = require("path");
const webpack = require("webpack");
//import webpack-pwa-manifest
const WebpackPwaManifest = require("webpack-pwa-manifest");
//import webpack bundle analyzer
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
  //webpack 3 properties: entry, output, and mode
  //1. declare entry property, this is the root of the bundle and the beginning of the dependency graph
  //2. bundled code and output into a specified folder
  //3. mode in which we want the webpack to run; by default is production mode, but we want to run in developement mode.

  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  output: {
    path: path.join(__dirname + "dist"), //folder 'dist', filename: __dirname
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath(url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    //added plugin for the webpack bundle analyzer
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // analyzeMode will output an HTML file called 'report.html' in the dist folder
    }),
    //new - invoke a constructor function
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: "development",
};

module.exports = config;
