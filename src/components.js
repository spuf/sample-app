'use strict'

import React, {PropTypes} from 'react'
import {Container, Row, RowInside, Aside} from './styles'
import {BondedInput} from './containers'
import round from 'lodash/round'

export const LabelledInput = ({text, value, onChange}) => (
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

export const Calculator = (props) => {
  const allowed_deviation = Number(props.allowed_deviation)
  const expected = Number(props.expected)
  const actual = Number(props.actual)

  const valid = allowed_deviation >= 0.01 && allowed_deviation <= 100 && expected > 0 && actual >= 0

  let deviation = 0
  let min = 0
  let max = 0

  if (valid) {
    deviation = Math.abs(actual - expected) / expected * 100
    min = expected * (1 - allowed_deviation / 100)
    max = expected * (1 + allowed_deviation / 100)
  }
  const rounded = (value) => valid ? round(value, 6).toString() : '?'

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
