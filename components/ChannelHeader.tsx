import { Image, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'
import { ChannelProps } from '../app/types'
import MenuButton from '../components/MenuButton'
import useIsMobile from '../hooks/useIsMobile'

const ChannelHeaderContainer = styled.View`
  border-bottom-width: 1px;
  padding: 8px 16px;
  /* -webkit-app-region: drag;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  padding-left: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
  margin-top: 100px; */
`

const Title = styled.View`
  /* align-items: center; */
`

const ChannelName = styled.Text`
  /* align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 0.5;
  color: #fff; */
`

const Topic = styled.Text`
  /* font-size: 0.75;
  color: #666; */
`

const Actions = styled.View`
  /* display: flex;
  text-align: right;
  vertical-align: middle; */
`

const SettingsButton = styled.View`
  /* cursor: pointer; */
  /* display: inline-block; */
  /* margin-left: 16px; */
  /* vertical-align: middle; */
`

export default function ChannelHeader() {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  function onClickTopic() {}

  function onClickSettings() {}

  return (
    <ChannelHeaderContainer style={{ borderBottomColor: colors.border }}>
      {isMobile && <MenuButton />}
      <Title>
        <ChannelName style={{ color: colors.primary }}>
          {currentCabal.currentChannel.name}
        </ChannelName>
        <Text style={{ color: colors.text }}>
          {currentCabal.currentChannel.members.length} Members
        </Text>
        <Topic style={{ color: colors.text }} onClick={onClickTopic}>
          {currentCabal.currentChannel.topic ?? 'Click to add a topic'}
        </Topic>
      </Title>
      <Actions>
        <SettingsButton onClick={onClickSettings}>
          {/* <Image src="static/images/icon-channelother.svg" /> */}
        </SettingsButton>
      </Actions>
    </ChannelHeaderContainer>
  )
}
