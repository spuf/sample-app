// @flow
'use strict'

export const UPDATE = Symbol('UPDATE')

type ActionTypes = typeof UPDATE

export type Action = {type: ActionTypes, key: string, value: string}

export const update = (key: string, value: string): Action => ({type: UPDATE, key, value})
