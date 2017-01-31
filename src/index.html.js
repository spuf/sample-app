'use strict'

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {Map} from 'immutable'
import map from 'lodash/map'
// import styleSheet from 'styled-components/lib/models/StyleSheet'
// import {injectGlobal} from 'styled-components'

const loadingState = Map({
  allowed_deviation: 'Loading...',
  expected: 'Loading...',
  actual: 'Loading...',
})
const store = createStore(calculator, loadingState)

// injectGlobal`
//   body::before {
//     content: " ";
//     z-index: 10;
//     display: block;
//     position: absolute;
//     height: 100%;
//     top: 0;
//     left: 0;
//     right: 0;
//     background: rgba(0, 0, 0, 0.1);
//   }
// `
const html = renderToStaticMarkup(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>
)
// @todo: not working in styled-components 1.4.2 with webpack 2
//const css = styleSheet.rules().map(rule => rule.cssText).join('\n')
const css = `
  body::before {
    content: "Loading...";
    text-align: center;
    padding-top: 5%;
    z-index: 10;
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: white;
  }
`

const renderFullPage = (html, css, templateParams) => `
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
  ${map(templateParams.htmlWebpackPlugin.files.chunks, (chunk) =>
  `<script src="${chunk.entry}"></script>`).join('\n')}
</body>
</html>
`.trim()

export default (templateParams) => renderFullPage(html, css, templateParams)
