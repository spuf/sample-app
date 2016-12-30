// @flow
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {loadState, saveState} from './storage'
import type {Map} from 'immutable'

export type State = Map<string, string>

const store = createStore(calculator, loadState())
store.subscribe(saveState(store))

render(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>,
  document.getElementById('app')
)

