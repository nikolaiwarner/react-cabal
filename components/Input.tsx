import { useTheme } from '@react-navigation/native'
import { ViewStyle } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: ${({ colors }) => colors.background};
  border-color: ${({ colors }) => colors.border};
  border-radius: 8px;
  border-width: 2px;
  display: flex;
  justify-content: center;
  margin-top: 8px;
  padding: 8px;
`

const TextInput = styled.TextInput`
  border-width: 0;
  color: ${({ colors }) => colors.text};
  font-size: 16px;
`

interface InputProps {
  containerStyle?: ViewStyle
  defaultValue?: string
  onChangeText?: (text: string) => any
  placeholder?: string
  style?: ViewStyle
  value?: string
}

export default function Input(props: InputProps) {
  const { colors } = useTheme()

  return (
    <Container colors={colors} style={props.containerStyle}>
      <TextInput
        colors={colors}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={props.style}
        value={props.value}
      />
    </Container>
  )
}
