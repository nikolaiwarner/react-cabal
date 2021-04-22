import { Button, TextInput, Text, View } from 'react-native'
import { NavigationContainer, DrawerActions, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import * as React from 'react'

// import CabalUI from '../components/Cabal'
// import { RootState } from '../app/rootReducer'
// import { useRenderIpc } from '../utils/cabal-render-ipc'
import MenuButton from '../components/MenuButton'

function AddCabalScreen({ navigation }) {
  const { colors } = useTheme()

  // const { cabals, currentCabalKey } = useSelector((state: RootState) => state.cabals)

  // useRenderIpc({ cabalKey: currentCabalKey, settings: {} })
  // console.log('', { cabals, currentCabalKey })

  // const currentCabal = cabals.find((cabal) => cabal.key === currentCabalKey)

  // console.log('currentCabal', currentCabal)

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <MenuButton />
      </View>
      <Text style={{ color: colors.primary }}>Cabal</Text>
      <Text style={{ color: colors.text }}>open source decentralized private chat</Text>

      <View style={{ backgroundColor: colors.card }}>
        <TextInput style={{ borderColor: colors.border }} placeholder="cabal://" />
        <TextInput style={{ borderColor: colors.border }} placeholder="Pick a nickname" />

        <Button title="Join" onPress={() => {}} />
      </View>

      <Button title="Create A New Cabal" onPress={() => {}} />
    </View>
  )
}

export default AddCabalScreen
