const {resolve} = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = 'NODE_ENV'
const PD = (prod, dev) => (process.env[NODE_ENV] == 'production' ? prod : dev)

module.exports = {
  entry: {
    app: resolve(__dirname, 'src', 'main.js'),
    vendor: []
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[id].bundle.[chunkhash:6].js'
  },

  devtool: PD('cheap-module-source-map', 'cheap-module-eval-source-map'),
  devServer: PD(null, {inline: true}),

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html.js'),
      inject: false,
      minify: PD({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        quoteCharacter: '"',
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true
      }, false)
    }),
    new webpack.EnvironmentPlugin([
      NODE_ENV
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        const userRequest = module.userRequest;
        return userRequest && /node_modules/.test(userRequest);
      }
    }),
  ].concat(PD([
    new CleanWebpackPlugin([resolve(__dirname, 'dist')]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      beautify: false
    })
  ], [])),

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            'es2015',
            'react'
          ],
          plugins: [].concat(PD([
            'transform-react-inline-elements',
            'transform-react-constant-elements',
            'transform-react-remove-prop-types'
          ], []))
        }
      }
    ]
  }

}
