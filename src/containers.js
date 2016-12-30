// @flow
import {PropTypes} from 'react'
import {connect} from 'react-redux'
import {update} from './actions'
import {LabelledInput, Calculator} from './components'
import type {Action} from './actions'
import type {State} from './main'
import type {LabelledInputProps, LabelledInputHandlers, CalculatorProps} from './components'

type BondedInputProps = {
  name: string
}
export const BondedInput = connect(
  (state: State, ownProps: BondedInputProps): LabelledInputProps => {
    return {
      value: state.get(ownProps.name),
      text: ownProps.name
    }
  },
  (dispatch: (action: Action) => any, ownProps: BondedInputProps): LabelledInputHandlers => {
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
  (state: State): CalculatorProps => {
    return {
      allowed_deviation: state.get('allowed_deviation'),
      expected: state.get('expected'),
      actual: state.get('actual')
    }
  }
)(Calculator)
