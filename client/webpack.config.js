const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

require('dotenv').config();

const isDevMode = process.env.NODE_ENV === 'development';
const outputDir = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app/boot.tsx')
  },
  mode: isDevMode ? 'development' : 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: outputDir,
    hot: true,
    compress: !isDevMode,
    port: 3001
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    path: outputDir,
    filename: '[name].js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader?silent=true'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(outputDir, 'index.html'),
      template: path.join(__dirname, 'src/index.html')
    })
  ]
};