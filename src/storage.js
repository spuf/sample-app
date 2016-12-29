import {fromJS} from 'immutable'
import {debounce, defaultsDeep} from 'lodash'
const KEY = 'state';

export const loadState = (defaultState) => {
  let loadedState = {}
  try {
    const string = localStorage.getItem(KEY)
    let object;
    if (string) {
      object = JSON.parse(string)
    }
    if (object) {
      loadedState = object
    }
  } catch (e) {
    console.error(e)
  }
  defaultsDeep(loadedState, defaultState)
  return fromJS(loadedState)
}

export const saveState = (store) => debounce(() => {
  localStorage.setItem(KEY, JSON.stringify(store.getState().toJS()))
}, 100)

