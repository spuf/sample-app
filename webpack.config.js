'use strict'

const {resolve} = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin

const NODE_ENV = 'NODE_ENV'
const PD = (prod, dev) => (process.env[NODE_ENV] === 'production' ? prod : dev)

module.exports = {
  context: __dirname,

  entry: {
    app: resolve(__dirname, 'src', 'app.js'),
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[name].chunk.[chunkhash:6].js',
  },

  devtool: PD('hidden-cheap-module-source-map', 'cheap-module-eval-source-map'),
  devServer: PD({}, {inline: true}),

  performance: {
    hints: 'error',
    maxEntrypointSize: 1024 ** 3,
    maxAssetSize: 1024 ** 3,
  },

  stats: {
    children: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html.js'),
      inject: false,
      minify: PD({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
      }, false),
    }),
    new webpack.EnvironmentPlugin(process.env[NODE_ENV] ? [NODE_ENV] : []),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      chunks: ['app'],
      minChunks: (module) => {
        const userRequest = module.userRequest
        return userRequest && /node_modules/.test(userRequest)
      },
    }),
  ].concat(PD([
    new CleanWebpackPlugin([resolve(__dirname, 'dist')]),
    new LicenseWebpackPlugin({
      pattern: /^.*$/,
      suppressErrors: true,
      perChunkOutput: false,
      outputFilename: '3rdpartylicenses.txt',
      addBanner: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
    }),
  ], [])),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: 'usage',
              targets: {
                browsers: [
                  '> 1%',
                  'last 2 versions',
                  'Firefox ESR',
                ],
              },
            }],
            'react',
          ],
          plugins: [].concat(PD([
            'transform-react-inline-elements',
            'transform-react-constant-elements',
            ['transform-react-remove-prop-types', {ignoreFilenames: ['node_modules']}],
          ], [])),
        },
      },
    ],
  },

}
