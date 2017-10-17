/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const autoprefixer = require('autoprefixer');

const webpackConfig = require('./webpack.config');
const NPMPackage = require('./../package');

const config = merge.smart(webpackConfig, {
  entry: {
    'scripts/app': './scripts/index.jsx',
    'scripts/modernizr': './scripts/vendor/modernizr-custom.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractText.extract('css?sourceMap&-autoprefixer!postcss?pack=custom!sass?sourceMap'),
      },
    ],
  },
  plugins: [
    new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyPlugin([
      { from: '.htaccess' },
      { from: 'robots.txt' },
      { from: 'deploy.php' },
    ]),
    new ExtractText('styles/app.[hash].css'),
    new HtmlPlugin({
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title,
      googleAnalytics: {
        trackingId: 'UA-33899521-1',
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 9',
                  'ie_mob >= 10',
                  'ff >= 30',
                  'chrome >= 34',
                  'safari >= 7',
                  'opera >= 23',
                  'ios >= 7',
                  'android >= 4.4',
                  'bb >= 10',
                ],
              }),
            ],
          };
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
    }),
  ],
});

module.exports = config;
