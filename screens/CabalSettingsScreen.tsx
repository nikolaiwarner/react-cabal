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
      <Text>
        Invite People Share this key with others to let them join the cabal.
        cabal://1fdc83d08699781adfeacba9aa6bb880203d5e61357e5667ccbcc12e4a9065ad Copy Key
        Cabal Name Set a local name for this cabal. Only you can see this. Cabal Club
        Enable desktop notifications Display a notification for new messages for this
        cabal when a channel is in the background. Remove this cabal from this Cabal
        Desktop client The local cabal database will remain and may also exist on peer
        clients. Remove Cabal (1fdc83d0...)
      </Text>
    </SafeAreaView>
  )
}

export default CabalSettingsScreen
