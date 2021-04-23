import { AntDesign, Feather } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { ChannelProps } from '../app/types'
import { LocalizationContext } from '../App'
import { RootState } from '../app/rootReducer'
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

export default function ChannelHeader() {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

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
            <Topic
              colors={colors}
              onPress={onPressTopic}
              title={t('channel_topic_placeholder')}
            >
              {currentCabal.currentChannel.topic ?? t('channel_topic_placeholder')}
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
