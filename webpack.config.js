const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.join(__dirname, 'dist');
const CLIENT_DIR = path.join(__dirname, 'client');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  context: CLIENT_DIR,
  entry: {
    app: [
      './index.js',
    ],
  },
  output: {
    filename: 'js/bundle.js',
    path: DIST_DIR,
  },
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: [
      /node_modules/,
      /server/,
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port,
    historyApiFallback: true,
    contentBase: DIST_DIR,
    hot: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
