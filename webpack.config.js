'use strict'

const {resolve} = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LicenseWebpackPlugin = require('license-webpack-plugin')

const NODE_ENV = 'NODE_ENV'
const PD = (prod, dev) => (process.env[NODE_ENV] == 'production' ? prod : dev)

module.exports = {
  entry: {
    app: resolve(__dirname, 'src', 'main.js'),
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[id].bundle.[chunkhash:6].js',
  },

  devtool: PD('cheap-module-source-map', 'cheap-module-eval-source-map'),
  devServer: PD({}, {inline: true}),

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
      name: 'vendor',
      minChunks: (module) => {
        const userRequest = module.userRequest
        return userRequest && /node_modules/.test(userRequest)
      },
    }),
  ].concat(PD([
    new CleanWebpackPlugin([resolve(__dirname, 'dist')]),
    new LicenseWebpackPlugin({
      filename: '3rdpartylicenses.txt',
      pattern: /^.*$/,
      suppressErrors: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
    }),
    new webpack.BannerPlugin({banner: 'Third party licenses can be found in 3rdpartylicenses.txt'}),
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
            ['es2015', {
              modules: false,
            }],
            'react',
          ],
          plugins: [].concat(PD([
            'transform-react-inline-elements',
            'transform-react-constant-elements',
            'transform-react-remove-prop-types',
          ], [])),
        },
      },
    ],
  },

}
