export const UPDATE = Symbol('UPDATE')

export const update = (key, value) => ({type: UPDATE, key, value})
