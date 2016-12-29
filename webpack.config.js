const {resolve} = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  entry: {
    app: [resolve(__dirname, 'src', 'main.js')],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'styled-components'
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src', 'index.html'),
      inject: 'body'
    })
  ],
  module: {/* see below */}
};
let babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    babelrc: false,
    presets: [
      'es2015',
      'react'
    ],
    plugins: []
  }
}
let htmlLoader = {
  test: /\.html$/,
  loader: 'html',
  query: {}
}

if (process.env.NODE_ENV != 'production') {
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    inline: true
  }
} else {
  config.plugins = config.plugins.concat([
    new CleanWebpackPlugin([resolve(__dirname, 'dist')]),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      beautify: false,
      sourceMap: false
    })
  ])
  babelLoader.query.plugins = babelLoader.query.plugins.concat([
    'transform-react-inline-elements',
    'transform-react-constant-elements',
    'transform-react-remove-prop-types'
  ])
  htmlLoader.query.minimize = true
}

config.module.loaders = [
  babelLoader,
  htmlLoader
]

module.exports = config
