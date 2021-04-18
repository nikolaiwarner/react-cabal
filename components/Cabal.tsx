import { Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import { CabalProps } from '../app/types'
import AppSidebar from './AppSidebar'
import Channel from './Channel'
import Sidebar from './Sidebar'

interface CabalScreenProps {
  cabals: CabalProps[]
  currentCabal: CabalProps
}

const CabalContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
`

export default function Cabal(props: CabalScreenProps) {
  if (!props.currentCabal) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <CabalContainer>
      <AppSidebar />
      <Sidebar />
      <Channel />
    </CabalContainer>
  )
}
