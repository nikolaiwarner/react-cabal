import { DrawerActions, useTheme } from '@react-navigation/native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import { CabalProps } from '../app/types'
import { RootState } from '../app/rootReducer'
import ChannelList from '../screens/ChannelListScreen'
import PeerList from './PeerList'

const SidebarContainer = styled.View`
  /* flex: 0 0 13.75; */
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-top: 2;
`

const CabalName = styled.Text`
  padding-top: 32px;
  padding-left: 16px;
  padding-right: 16px;
  overflow: hidden;
  color: #fff;
`

export default function Sidebar(props) {
  const { colors } = useTheme()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.background }}>
      <SidebarContainer>
        {currentCabal && (
          <CabalName style={{ color: colors.text }}>
            {currentCabal.name ?? currentCabal.key}
          </CabalName>
        )}
        <ChannelList />
        <PeerList />
      </SidebarContainer>
    </DrawerContentScrollView>
  )
}
