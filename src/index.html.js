// @flow
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {Map} from 'immutable'
import map from 'lodash/map'
import styleSheet from 'styled-components/lib/models/StyleSheet'

import type {State} from './main'

const loadingState: State = Map({
  allowed_deviation: 'Loading...',
  expected: 'Loading...',
  actual: 'Loading...'
})
const store = createStore(calculator, loadingState)

const html = renderToStaticMarkup(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>
)
const css = styleSheet.rules().map(rule => rule.cssText).join('\n')

const renderFullPage = (html: string, css: string, templateParams: Object) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8">
  <title>App</title>
  <link rel="shortcut icon" href="https://arseny.me/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="app">
    <style>${css}</style>
    ${html}
  </div>
  ${map(templateParams.htmlWebpackPlugin.files.chunks,
    (chunk) => `<script type="text/javascript" src="${chunk.entry}"></script>`
  ).join('\n')}
</body>
</html>
`.trim()

module.exports = (templateParams: Object): string => renderFullPage(html, css, templateParams)
