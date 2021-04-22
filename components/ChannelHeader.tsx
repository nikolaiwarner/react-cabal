import { AntDesign, Feather } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'
import { ChannelProps } from '../app/types'
import MenuButton from '../components/MenuButton'
import useIsMobile from '../hooks/useIsMobile'

const ChannelHeaderContainer = styled.View`
  align-items: center;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  height: 62px;
  justify-content: space-between;
  padding-bottom: 8px;
  padding-top: 8px;
  padding: 16px;
  /* -webkit-app-region: drag;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 100px; */
`

const MenuTitleContainer = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
`

const Title = styled.View`
  /* align-items: center; */
`

const ChannelName = styled.Text`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 4px;
  /* align-items: center;
  display: flex;
  */
`

const ChannelInfo = styled.View`
  display: flex;
  flex-direction: row;
`

const Topic = styled.Text`
  color: ${({ colors }) => colors.textSofter};
`

const Actions = styled.View`
  /* display: flex;
  text-align: right;
  vertical-align: middle; */
`

export default function ChannelHeader() {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const onPressFavorite = () => {}

  const onPressChannelDetails = useCallback(() => {
    navigation.navigate('ChannelDetailScreen', { title: 'Channel Details' })
  }, [])

  const onPressTopic = () => {}

  return (
    <ChannelHeaderContainer style={{ borderBottomColor: colors.border }}>
      <MenuTitleContainer>
        {isMobile && <MenuButton />}
        <Title>
          <ChannelName style={{ color: colors.text }}>
            {currentCabal.currentChannel.name}{' '}
            <TouchableOpacity onPress={onPressFavorite}>
              <AntDesign name="staro" size={18} color={colors.textSofter} />
            </TouchableOpacity>
          </ChannelName>
          <ChannelInfo>
            <Text style={{ color: colors.textHighlight }}>
              {currentCabal.currentChannel.members.length}{' '}
              <Feather name="users" size={12} color={colors.textHighlight} /> ⋅{' '}
            </Text>
            <Topic colors={colors} onPress={onPressTopic} title="Click to add a topic">
              {currentCabal.currentChannel.topic ?? 'Click to add a topic'}
            </Topic>
          </ChannelInfo>
        </Title>
      </MenuTitleContainer>
      <Actions>
        <TouchableOpacity onPress={onPressChannelDetails}>
          <Feather name="more-vertical" size={18} color={colors.textSofter} />
        </TouchableOpacity>
      </Actions>
    </ChannelHeaderContainer>
  )
}
