import {UPDATE} from './actions'

export const calculator = (state = {}, action) => {
  switch (action.type) {
    case UPDATE:
      return state.set(action.key, action.value)
    default:
      return state
  }
}
