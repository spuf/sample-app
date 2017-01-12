'use strict'

import {PropTypes} from 'react'
import {connect} from 'react-redux'
import {update} from './actions'
import {LabelledInput, Calculator} from './components'

export const BondedInput = connect(
  (state, ownProps) => {
    return {
      value: state.get(ownProps.name),
      text: ownProps.name
    }
  },
  (dispatch, ownProps) => {
    return {
      onChange: (value) => {
        dispatch(update(ownProps.name, value))
      }
    }
  }
)(LabelledInput)
BondedInput.propTypes = {
  name: PropTypes.string.isRequired,
}

export const CalculatorApp = connect(
  (state) => {
    return {
      allowed_deviation: state.get('allowed_deviation'),
      expected: state.get('expected'),
      actual: state.get('actual')
    }
  }
)(Calculator)
