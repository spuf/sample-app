// @flow
import React from 'react'
import {renderToString} from 'react-dom/server'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import serialize from 'serialize-javascript'
import {Map} from 'immutable'
import map from 'lodash/map'
import styleSheet from 'styled-components/lib/models/StyleSheet'

import type {State} from './main'

const initialState: State = Map({
  allowed_deviation: 'Loading...',
  expected: 'Loading...',
  actual: 'Loading...'
})
const store = createStore(calculator, initialState)

const html = renderToString(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>
)
const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')

const preloadedState = store.getState().toJS()

const renderFullPage = (html: string, preloadedState: Object, templateParams: Object) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8">
  <title>App</title>
  <link rel="shortcut icon" href="https://arseny.me/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${styles}
  </style>
</head>
<body>
  <div id="app">${html}</div>
  <script type="text/javascript">
    window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
  </script>
  ${map(templateParams.htmlWebpackPlugin.files.chunks,
    (chunk) => `<script type="text/javascript" src="${chunk.entry}"></script>`
  ).join('\n')}
</body>
</html>
`.trim()

module.exports = (templateParams: Object): string => renderFullPage(html, preloadedState, templateParams)
