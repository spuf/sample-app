'use strict'

import {Record} from 'immutable'
import {UPDATE} from './actions'

export const StateRecord = Record({
  allowed_deviation: '3.5',
  expected: '29',
  actual: '30',
}, 'StateRecord')

const initialState = new StateRecord()

export const calculator = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return state.set(action.key, action.value)
    default:
      return state
  }
}
