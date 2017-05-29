'use strict'

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {Map} from 'immutable'
import {map} from 'lodash-es'
import {ServerStyleSheet, injectGlobal} from 'styled-components'

const loadingState = Map({
  allowed_deviation: 'Loading...',
  expected: 'Loading...',
  actual: 'Loading...',
})
const store = createStore(calculator, loadingState)

const sheet = new ServerStyleSheet()

const html = renderToStaticMarkup(sheet.collectStyles(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>
))
const css = sheet.getStyleTags()

const renderFullPage = (html, css, templateParams) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8">
  <title>App</title>
  <link rel="shortcut icon" href="https://arseny.me/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${css}
</head>
<body>
  <div id="app">
    ${html}
  </div>
  ${map(templateParams.htmlWebpackPlugin.files.chunks, (chunk) =>
  `<script src="${chunk.entry}"></script>`).join('\n')}
</body>
</html>
`.trim()

export default (templateParams) => renderFullPage(html, css, templateParams)
