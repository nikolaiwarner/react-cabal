import { useTheme } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import React, { ReactElement } from 'react'
import styled from 'styled-components/native'
import SectionHeaderText from './SectionHeaderText'

const Container = styled.View`
  align-items: center;
  border-bottom-color: ${({ colors }) => colors.border};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  height: 62px;
  justify-content: space-between;
  padding: 16px 0 16px 16px;
`

const Actions = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CloseButton = styled.TouchableOpacity`
  padding: 0 16px;
`

interface PanelHeaderProps {
  onPressClose?: () => void
  renderActions?: () => ReactElement
  title: string
}

export default function PanelHeader(props: PanelHeaderProps) {
  const { colors } = useTheme()

  return (
    <Container colors={colors}>
      <SectionHeaderText colors={colors}>{props.title}</SectionHeaderText>
      <Actions>
        {props.renderActions && props.renderActions()}
        {props.onPressClose && (
          <CloseButton onPress={props.onPressClose}>
            <Feather color={colors.text} name="x" size={24} />
          </CloseButton>
        )}
      </Actions>
    </Container>
  )
}
