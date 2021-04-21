import { DrawerActions, useTheme } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps, UserProps } from '../app/types'
import { focusChannel } from '../features/cabals/cabalsSlice'
import { RootState } from '../app/rootReducer'
import CabalList from './CabalList'
import SidebarHeader from './SidebarHeader'
import SidebarList from './SidebarList'
import { color } from 'react-native-reanimated'

const SidebarContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  height: 100%;
`

const Row = styled.TouchableOpacity`
  /* cursor: pointer; */
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
`

const RowText = styled.Text`
  /* cursor: pointer; */
  font-size: 16px;
`

export default function Sidebar() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const renderChannelListItem = useCallback(
    (channel: ChannelProps, isActive?: boolean) => {
      const onPressRow = () => {
        // navigation.dispatch(DrawerActions.toggleDrawer())
        dispatch(focusChannel({ cabalKey: currentCabal.key, channel }))
      }

      const color = isActive ? colors.text : colors.textSofter
      return (
        <Row key={channel.name} onPress={onPressRow}>
          <RowText style={{ color }}>
            <Feather name="hash" size={12} color={color} />
            {'  '}
            {channel.name}
          </RowText>
        </Row>
      )
    },
    [],
  )

  const renderPeerListItem = useCallback((user: UserProps, isActive?: boolean) => {
    const onPressRow = () => {
      // navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
      <Row key={user.key} onPress={onPressRow}>
        <RowText style={{ color: isActive ? colors.text : colors.textSofter }}>
          <FontAwesome
            name="circle-o"
            size={12}
            color={user.online ? colors.primary : colors.textSofter}
          />
          {'  '}
          {user.name ?? user.key}
        </RowText>
      </Row>
    )
  }, [])

  return (
    <SidebarContainer style={{ backgroundColor: colors.background }}>
      <CabalList />
      {currentCabal && (
        <ScrollView>
          <SidebarHeader />
          <SidebarList
            activeItem={currentCabal.currentChannel}
            items={currentCabal.channelsStarred}
            renderItem={renderChannelListItem}
            title="Starred"
          />
          <SidebarList
            activeItem={currentCabal.currentChannel}
            items={currentCabal.channelsJoined}
            renderItem={renderChannelListItem}
            title="Channels"
          />
          <SidebarList
            items={currentCabal.users}
            renderItem={renderPeerListItem}
            title="Peers"
          />
        </ScrollView>
      )}
    </SidebarContainer>
  )
}
