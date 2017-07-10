'use strict'

import localForage from 'localforage'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {autoRehydrate, persistStore} from 'redux-persist-immutable'
import {CalculatorApp} from './containers'
import {calculator, StateRecord} from './reducers'

const store = createStore(calculator, autoRehydrate())
persistStore(store, {
  storage: localForage,
  keyPrefix: 'v1',
  records: [StateRecord],
})

render(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>,
  document.getElementById('app')
)
