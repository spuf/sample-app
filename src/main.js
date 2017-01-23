'use strict'

import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {loadState, saveState} from './storage'

const store = createStore(calculator, loadState())
store.subscribe(saveState(store))

render(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>,
  document.getElementById('app')
)
