const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  devtool: "source-map",
  // mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]-[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
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
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  grid: true,
                }),
                require("css-declaration-sorter")({
                  order: "concentric-css", // ボックスモデルの外から内へのソート
                }),
                require("postcss-sort-media-queries")({
                  sort: "mobile-first", // モバイルファースト時はこっち
                }),
                // require("postcss-sort-media-queries")({
                //   sort: "desktop-first", // PCファースト時はこっち
                // }),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                data: "@import 'global-imports.scss';",
                includePaths: [path.resolve(__dirname, 'src/scss/')],
                outputStyle: "expanded",
              },
            },
          },
          {
            loader: "import-glob-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash].[ext]",
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
        use: [
          {
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
      filename: "./css/[name]-[hash].css",
    }),
    new StylelintPlugin({
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/business.pug",
      filename: "business.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/intro.pug",
      filename: "intro.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/company.pug",
      filename: "company.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/news.pug",
      filename: "news.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/contact.pug",
      filename: "contact.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/recruit.pug",
      filename: "recruit.html",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};
