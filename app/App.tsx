import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native-web'
import React from 'react'

import CabalUI from '../components/Cabal'
import { RootState } from '../app/rootReducer'
// import { useRenderIpc } from '../utils/cabal-render-ipc'

function App() {
  const { cabals, currentCabalKey } = useSelector((state: RootState) => state.cabals)

  // useRenderIpc({ cabalKey: currentCabalKey, settings: {} })
  console.log('', { cabals, currentCabalKey })

  const currentCabal = cabals.find((cabal) => cabal.key === currentCabalKey)

  console.log('currentCabal', currentCabal)

  if (currentCabal) {
    return <CabalUI cabals={cabals} currentCabal={currentCabal!} />
  } else {
    return <View>Cabal is connecting...</View>
  }
}

export default App
