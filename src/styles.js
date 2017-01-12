'use strict'

import styled, {css, injectGlobal} from 'styled-components'

injectGlobal`
  body {
    font-family: sans-serif;
    font-size: medium;
    background-color: white;
    color: black;
  }
  html.wf-active body {
    font-family: "Roboto", sans-serif;
  }
`

const media = {
  big: (...args) => css`
    @media all and (min-width: 500px) {
      ${css(...args)}
    } 
  `,
  small: (...args) => css`
    @media all and (min-width: 250px) {
      ${css(...args)}
    } 
  `,
  tiny: (...args) => css`
    @media all and (max-width: 249px) {
      ${css(...args)}
    } 
  `
}

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-width: 200px;
`

const ContainerItem = styled.div`
  padding: 10px;
  flex: 1 100%;
  ${media.big`
    order: ${props => props.order || 0}
  `}
  align-self: flex-end;
`

export const Row = styled(ContainerItem)`
  text-align: center;
`

export const RowInside = styled(Row)`
  text-align: center;
  ${media.big`
    flex: 2 0px;
  `}
`

export const Aside = styled(ContainerItem)`
  color: ${props => props.color || 'black'};
  ${media.small`
    flex: 1 20%; 
    text-align: ${props => props.align || 'left'};
  `}  
  ${media.tiny`
    text-align: center;
  `}
`
