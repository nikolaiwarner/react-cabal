import { View } from 'react-native-web'
import React from 'react'
import styled from 'styled-components/native'

import AppSidebar from './AppSidebar'
import Channel from './Channel'
import Sidebar from './Sidebar'

const CabalContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
`

export default function Cabal({ cabals, currentCabal }) {
  if (!currentCabal) {
    return <View>Loading...</View>
  }
  return (
    <CabalContainer>
      <AppSidebar cabals={cabals} currentCabal={currentCabal} />
      <Sidebar cabal={currentCabal} />
      <Channel cabal={currentCabal} channel={currentCabal.currentChannel} />
    </CabalContainer>
  )
}
