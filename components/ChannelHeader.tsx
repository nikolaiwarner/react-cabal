import { AntDesign, Feather } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { LocalizationContext } from '../utils/Translations'
import MenuButton from '../components/MenuButton'
import useIsMobile from '../hooks/useIsMobile'
import { useChannel } from '../lib'

export default function ChannelHeader() {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)

  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentChannel: currentChannelName, channels } = useChannel()

  const currentChannel = channels?.[currentChannelName] || {}

  window.currentChannel = currentChannel
  const onPressFavorite = () => {}

  const onPressChannelDetails = useCallback(() => {
    navigation.navigate('ChannelDetailScreen')
  }, [])

  const onPressTopic = () => {}

  return (
    <ChannelHeaderContainer style={{ borderBottomColor: colors.border }}>
      <MenuTitleContainer>
        {isMobile && <MenuButton />}
        <Title>
          <ChannelName colors={colors}>
            {currentChannel?.name}{' '}
            <TouchableOpacity onPress={onPressFavorite}>
              <AntDesign name="staro" size={18} color={colors.textSofter} />
            </TouchableOpacity>
          </ChannelName>
          <ChannelInfo>
            <Text style={{ color: colors.textHighlight }}>
              {currentChannel?.members?.size}{' '}
              <Feather name="users" size={12} color={colors.textHighlight} /> ⋅{' '}
            </Text>
            <Topic
              colors={colors}
              onPress={onPressTopic}
              title={t('channel_topic_placeholder')}
            >
              {currentChannel.topic ?? t('channel_topic_placeholder')}
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

  /* TODO: for electron:
  -webkit-app-region: drag; */
`

const MenuTitleContainer = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
`

const Title = styled.View``

const ChannelName = styled.Text`
  color: ${({ colors }) => colors.text};
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 4px;
`

const ChannelInfo = styled.View`
  display: flex;
  flex-direction: row;
`

const Topic = styled.Text`
  color: ${({ colors }) => colors.textSofter};
`

const Actions = styled.View``
