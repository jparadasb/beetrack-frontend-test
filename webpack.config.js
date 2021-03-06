const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostCssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const jsRegex = /\.(js|jsx)$/;
const cssRegex = /\.(scss|css)/;
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolvePath('./src/index.html'),
  inject: true,
});

module.exports = {
  entry: resolvePath('./src/index.jsx'),
  output: {
    path: resolvePath('dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: jsRegex,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: jsRegex,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        loader: 'file-loader',
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        options: {
          name: 'static/fonts/[name][hash:8].[ext]',
        },
      },
      {
        test: cssRegex,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [resolvePath('./styles')],
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                PostCssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    'last 3 versions',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    HtmlWebpackPluginConfig,
  ],
  devtool: 'source-map',
};
