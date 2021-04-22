import { DrawerActions, useTheme } from '@react-navigation/native'
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps, UserProps } from '../app/types'
import { color } from 'react-native-reanimated'
import { focusChannel, setSelectedUser } from '../features/cabals/cabalsSlice'
import { RootState } from '../app/rootReducer'
import CabalList from './CabalList'
import SidebarHeader from './SidebarHeader'
import SidebarList from './SidebarList'

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

export default function Sidebar(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const renderChannelListItem = useCallback(
    (channel: ChannelProps, isActive?: boolean) => {
      const onPressRow = () => {
        dispatch(focusChannel({ cabalKey: currentCabal.key, channel }))
        props.navigation.dispatch(DrawerActions.toggleDrawer())
        props.navigation.navigate('ChannelScreen')
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
      dispatch(setSelectedUser(user))
      props.navigation.dispatch(DrawerActions.toggleDrawer())
      props.navigation.navigate('UserProfileScreen')
    }
    return (
      <Row key={user.key} onPress={onPressRow}>
        <RowText style={{ color: isActive ? colors.text : colors.textSofter }}>
          <FontAwesome
            color={user.online ? colors.primary : colors.textSofter}
            name="circle-o"
            size={12}
          />
          {'  '}
          {user.name ?? user.key}
        </RowText>
      </Row>
    )
  }, [])

  return (
    <SidebarContainer style={{ backgroundColor: colors.background }}>
      <CabalList navigation={props.navigation} />
      {currentCabal && (
        <ScrollView>
          <SidebarHeader navigation={props.navigation} />
          <SidebarList
            activeItem={currentCabal.currentChannel}
            isClosed={true}
            items={currentCabal.channelsStarred}
            renderItem={renderChannelListItem}
            title="Starred"
          />
          <SidebarList
            activeItem={currentCabal.currentChannel}
            isClosed={false}
            items={currentCabal.channelsJoined}
            renderItem={renderChannelListItem}
            title="Channels"
          />
          <SidebarList
            isClosed={false}
            items={currentCabal.users}
            renderItem={renderPeerListItem}
            title="Peers"
          />
        </ScrollView>
      )}
    </SidebarContainer>
  )
}
