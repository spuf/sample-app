// @flow
'use strict'

import {UPDATE} from './actions'
import {Map} from 'immutable'
import type {State} from './main'
import type {Action} from './actions'

const initialState: State = Map({
  allowed_deviation: '3.5',
  expected: '29',
  actual: '30'
})

export const calculator = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UPDATE:
      return state.set(action.key, action.value)
    default:
      return state
  }
}
