// @flow
import React, {PropTypes} from 'react'
import {Container, Row, RowInside, Aside} from './styles'
import {BondedInput} from './containers'
import round from 'lodash/round'

export type LabelledInputProps = {
  text: string,
  value: string
}
export type LabelledInputHandlers = {
  onChange: (value: string) => void
}
export const LabelledInput = ({text, value, onChange}: LabelledInputProps & LabelledInputHandlers) => (
  <label>
    {text}:
    <br/>
    <input type="text" value={value} onChange={e => onChange(e.target.value)}/>
  </label>
)
LabelledInput.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export type CalculatorProps = {
  allowed_deviation: string,
  expected: string,
  actual: string
}
export const Calculator = (props: CalculatorProps) => {
  const allowed_deviation: number = Number(props.allowed_deviation)
  const expected: number = Number(props.expected)
  const actual: number = Number(props.actual)

  const valid: boolean = allowed_deviation >= 0.01 && allowed_deviation <= 100 && expected > 0 && actual >= 0

  let deviation: number = 0
  let min: number = 0
  let max: number = 0

  if (valid) {
    deviation = Math.abs(actual - expected) / expected * 100
    min = expected * (1 - allowed_deviation / 100)
    max = expected * (1 + allowed_deviation / 100)
  }
  const rounded = (value: number): string => valid ? round(value, 6).toString() : '?'

  return (
    <Container>
      <Row order="1">
        <BondedInput
          name="allowed_deviation"
        />
      </Row>
      <Row order="2">
        <BondedInput
          name="expected"
        />
      </Row>
      <RowInside order="4">
        <BondedInput
          name="actual"
        />
      </RowInside>
      <Aside
        order="3"
        align="right"
        color={valid && min > actual ? 'red' : null}
      >{rounded(min)}&nbsp;&lt;</Aside>
      <Aside
        order="5"
        align="left"
        color={valid && max < actual ? 'red' : null}
      >&lt;&nbsp;{rounded(max)}</Aside>
      <Row order="6">
        Actual deviation: {rounded(deviation)}%
      </Row>
    </Container>
  )
}
Calculator.propTypes = {
  allowed_deviation: PropTypes.string.isRequired,
  expected: PropTypes.string.isRequired,
  actual: PropTypes.string.isRequired
}
