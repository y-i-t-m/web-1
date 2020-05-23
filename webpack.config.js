const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                modules: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [{
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [{
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html"
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
};
