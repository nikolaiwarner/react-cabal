import { DrawerActions, useTheme, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import React from 'react'

export default function MenuButton() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <Feather
      color={colors.text}
      name="menu"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      size={24}
    />
  )
}
