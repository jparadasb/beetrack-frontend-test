const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const PostCssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const jsRegex = /\.(js|jsx)$/;
const cssRegex = /\.(scss|css)/;
const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') };
const extractTextPluginLoadCssConfig = {
  fallback: {
    loader: require.resolve('style-loader'),
    options: {
      hmr: false,
    },
  },
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: true,
      },
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
};

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolvePath('./src/index.html'),
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'], {
  root: appDirectory,
  verbose: false,
  dry: false,
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
        loader: ExtractTextPlugin.extract(Object.assign(extractTextPluginLoadCssConfig, extractTextPluginOptions)),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    CleanWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new MinifyPlugin(),
    HtmlWebpackPluginConfig,
  ],
};
