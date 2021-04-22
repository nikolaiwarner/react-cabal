import React from 'react'
import styled from 'styled-components/native'

const PanelSection = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ colors }) => colors.border};
  padding: 16px;
`

export default PanelSection
