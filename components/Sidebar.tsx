import { DrawerActions, useTheme } from '@react-navigation/native'
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps, UserProps } from '../app/types'
import {
  focusChannel,
  setSelectedUser,
  updateSidebarList,
} from '../features/cabals/cabalsSlice'
import { LocalizationContext } from '../utils/Translations'
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
  const { t } = useContext(LocalizationContext)
  const dispatch = useDispatch()

  const { currentCabal, sidebarLists } = useSelector((state: RootState) => state.cabals)

  const onPressOpenChannelBrowser = useCallback(() => {
    props.navigation.dispatch(DrawerActions.toggleDrawer())
    props.navigation.navigate('ChannelBrowserScreen')
  }, [])

  const renderChannelListHeaderActionButton = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={onPressOpenChannelBrowser}
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <Feather name="plus" size={18} color={colors.text} />
      </TouchableOpacity>
    )
  }, [])

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
          {sidebarLists.map((sidebarList) => {
            if (sidebarList.id === 'favorites') {
              return (
                <SidebarList
                  activeItem={currentCabal.currentChannel}
                  items={currentCabal.channelsFavorites}
                  renderItem={renderChannelListItem}
                  sidebarList={sidebarList}
                  title={t('sidebarlist_favorites')}
                />
              )
            } else if (sidebarList.id === 'channels_joined') {
              return (
                <SidebarList
                  activeItem={currentCabal.currentChannel}
                  items={currentCabal.channelsJoined}
                  renderHeaderActionButton={renderChannelListHeaderActionButton}
                  renderItem={renderChannelListItem}
                  sidebarList={sidebarList}
                  title={t('sidebarlist_channels')}
                />
              )
            } else if (sidebarList.id === 'peers') {
              return (
                <SidebarList
                  items={currentCabal.users}
                  renderItem={renderPeerListItem}
                  sidebarList={sidebarList}
                  title={t('sidebarlist_peers')}
                />
              )
            } else {
              // TODO: Custom lists
              // return (
              //   <SidebarList
              //     items={}
              //     renderItem={}
              //     sidebarList={sidebarList}
              //     title={sidebarList.title}
              //   />
              // )
            }
          })}
        </ScrollView>
      )}
    </SidebarContainer>
  )
}
