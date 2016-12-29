import React, {PropTypes} from 'react'
import {Container, Row, RowInside, Aside} from './styles'
import {BondedInput} from './containers'
import {round, isNumber} from 'lodash'

export const LabelledInput = ({text, value, onChange}) => (
  <label>
    {text}:
    <br/>
    <input type="text" value={value} onChange={e => onChange(e.target.value)}/>
  </label>
)
LabelledInput.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}

export const Calculator = ({allowed_deviation, expected, actual}) => {
  let deviation
  let min
  let max
  if (
    allowed_deviation > 0.01 && allowed_deviation <= 100 && expected > 0 && actual > 0
  ) {
    deviation = Math.abs(actual - expected) / expected * 100
    min = expected * (1 - allowed_deviation / 100)
    max = expected * (1 + allowed_deviation / 100)
  }
  const rounded = (value) => isNumber(value) ? round(value, 6) : '?'

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
        color={min > actual ? 'red' : null}
      >{rounded(min)}&nbsp;&lt;</Aside>
      <Aside
        order="5"
        align="left"
        color={max < actual ? 'red' : null}
      >&lt;&nbsp;{rounded(max)}</Aside>
      <Row order="6">
        Actual deviation: {rounded(deviation)}%
      </Row>
    </Container>
  )
}
Calculator.propTypes = {
  allowed_deviation: PropTypes.any.isRequired,
  expected: PropTypes.any.isRequired,
  actual: PropTypes.any.isRequired
}
