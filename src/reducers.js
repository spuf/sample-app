'use strict'

import {UPDATE} from './actions'
import {Map} from 'immutable'

const initialState = Map({
  allowed_deviation: '3.5',
  expected: '29',
  actual: '30',
})

export const calculator = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return state.set(action.key, action.value)
    default:
      return state
  }
}
