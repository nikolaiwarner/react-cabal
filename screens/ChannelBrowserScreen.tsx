import { Feather } from '@expo/vector-icons'
import { NavigationContainer, DrawerActions, useTheme } from '@react-navigation/native'
import { TextInput, Text, View, SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { LocalizationContext } from '../utils/Translations'
import { RootState } from '../app/rootReducer'
import Button from '../components/Button'
import MenuButton from '../components/MenuButton'
import PanelHeader from '../components/PanelHeader'
import SectionHeaderText from '../components/SectionHeaderText'
import PanelSection from '../components/PanelSection'
import { ChannelProps } from '../app/types'
import { ScrollView } from 'react-native-gesture-handler'
import { focusChannel } from '../features/cabals/cabalsSlice'

const Row = styled.TouchableOpacity`
  padding: 16px 16px 16px 0;
`

const Name = styled.Text`
  color: ${({ colors }) => colors.text};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`

const MemberCount = styled.Text``

const Topic = styled.Text``

function ChannelBrowserScreen({ navigation }) {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)
  const dispatch = useDispatch()

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onPressCreateChannel = useCallback(() => {}, [])

  const onPressJoinChannel = useCallback((channel) => {
    dispatch(focusChannel({ cabalKey: currentCabal.key, channel }))
    navigation.navigate('ChannelScreen')
  }, [])

  const renderPanelHeaderActions = useCallback(() => {
    return (
      <Button
        title={t('channel_browser_create_channel_button')}
        onPress={onPressCreateChannel}
      ></Button>
    )
  }, [])

  const renderChannelRow = (channel: ChannelProps) => {
    return (
      <Row key={channel.name} onPress={() => onPressJoinChannel(channel)}>
        <Name colors={colors}>{channel.name}</Name>
        <MemberCount colors={colors}>
          {channel.members.length}{' '}
          <Feather name="users" size={14} color={colors.textHighlight} />
        </MemberCount>
        <Topic colors={colors}>{channel.topic}</Topic>
      </Row>
    )
  }

  const joinedChannelNames = currentCabal.channelsJoined.map((channel) => channel.name)
  const joinableChannels = currentCabal.channels.filter(
    (channel) => !joinedChannelNames.includes(channel.name),
  )

  return (
    <SafeAreaView>
      <PanelHeader
        onPressClose={onPressClose}
        renderActions={renderPanelHeaderActions}
        title={t('channel_browser_title')}
      />
      <ScrollView>
        {!!joinableChannels.length && (
          <PanelSection colors={colors}>
            <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
              {t('channel_browser_joinable_channels_list_title')}
            </SectionHeaderText>
            {joinableChannels.map(renderChannelRow)}
          </PanelSection>
        )}
        {!!currentCabal.channelsJoined.length && (
          <PanelSection colors={colors} style={{ marginBottom: 100 }}>
            <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
              {t('channel_browser_joined_channels_list_title')}
            </SectionHeaderText>
            {currentCabal.channelsJoined.map(renderChannelRow)}
          </PanelSection>
        )}
        {/* {!!currentCabal.channelsArchived.length && (
          <PanelSection colors={colors}>
            <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
              {t('channel_browser_archived_channels_list_title')}
            </SectionHeaderText>
            {currentCabal.channelsArchived.map(renderChannelRow)}
          </PanelSection>
        )} */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChannelBrowserScreen
