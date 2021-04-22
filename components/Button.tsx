import { ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ colors }) => colors.buttonBackground};
  border-color: ${({ colors }) => colors.buttonBorder};
  border-width: 1px;
  border-radius: 8px;
  justify-content: center;
  padding: 4px 8px;
`

const Title = styled.Text`
  color: ${({ colors }) => colors.buttonText};
  font-size: 14px;
  text-transform: uppercase;
`

interface ButtonProps {
  onPress: () => void
  style: ViewStyle
  title: string
}

export default function Button(props: ButtonProps) {
  const { colors } = useTheme()

  return (
    <Container colors={colors} onPress={props.onPress} style={props.style}>
      <Title colors={colors}>{props.title}</Title>
    </Container>
  )
}
