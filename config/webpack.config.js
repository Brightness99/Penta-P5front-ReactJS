/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  context: path.join(__dirname, '../app'),
  resolve: {
    alias: {
      modernizr$: path.join(__dirname, '.modernizrrc'),
      assets: path.join(__dirname, '../assets'),
    },
    modules: [path.join(__dirname, '../app', 'scripts'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  entry: {},
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel?cacheDirectory'],
        include: [
          path.join(__dirname, '../app', 'scripts'),
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file?name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file',
            options: {
              name: 'media/[name].[hash].[ext]',
            },
          },
        ],
        include: [/media/, /node_modules/],
      },
      {
        test: /\.json$/,
        use: ['json'],
      },
      {
        test: /\.modernizrrc$/,
        use: ['expose?Modernizr', 'modernizr', 'json'],
      },
      {
        test: /\.md$/,
        use: ['html', 'markdown'],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 11',
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
  ],
};

module.exports = config;
