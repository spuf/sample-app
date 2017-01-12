// @flow
'use strict'

import {fromJS} from 'immutable'
import {debounce} from 'lodash'

import type {Store} from 'redux'
import type {State} from './main'
import type {Action} from './actions'

const KEY = 'state';

export const loadState = () => {
  let loadedState
  try {
    const string = localStorage.getItem(KEY)
    let object;
    if (string) {
      object = JSON.parse(string)
    }
    if (object) {
      loadedState = fromJS(object)
    }
  } catch (e) {
    console.error(e)
  }
  return loadedState
}

export const saveState = (store: Store<State, Action>) => debounce(() => {
  localStorage.setItem(KEY, JSON.stringify(store.getState().toJS()))
}, 100)

