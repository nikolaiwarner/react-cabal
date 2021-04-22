import { Button, TextInput, Text, View, SafeAreaView } from 'react-native'
import { NavigationContainer, DrawerActions, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import * as React from 'react'

import { RootState } from '../app/rootReducer'
import MenuButton from '../components/MenuButton'

function CabalSettingsScreen({ navigation }) {
  const { colors } = useTheme()

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  return (
    <SafeAreaView>
      <MenuButton />
      <Text>Browse Channels Create A New Channel Channels you can join</Text>
    </SafeAreaView>
  )
}

export default CabalSettingsScreen
