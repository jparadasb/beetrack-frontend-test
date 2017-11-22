const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const filesRegex = /\.(js|jsx)$/;
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolvePath('./src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: resolvePath('./src/index.jsx'),
  output: {
    path: resolvePath('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: filesRegex,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: filesRegex,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}