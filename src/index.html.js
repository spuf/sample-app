// @todo: html-webpack-plugin can't do this in 2.26.0
const prerender = require('./prerender.js')
module.exports = prerender.__esModule ? prerender.default : prerender
