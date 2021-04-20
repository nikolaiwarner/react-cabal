import { DrawerActions, useTheme, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
  padding-right: 16px;
`

export default function MenuButton() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <ButtonContainer onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Feather color={colors.text} name="menu" size={24} />
    </ButtonContainer>
  )
}
