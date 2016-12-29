import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {calculator} from './reducers'
import {CalculatorApp} from './containers'
import {loadState, saveState} from './storage'

const preloadedState = loadState({
  allowed_deviation: 10,
  expected: 29,
  actual: 30
})

const store = createStore(calculator, preloadedState)
store.subscribe(saveState(store))

render(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>,
  document.getElementById('app')
)

