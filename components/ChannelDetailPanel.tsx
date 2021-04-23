import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps, UserProps } from '../app/types'
import { color } from 'react-native-reanimated'
import { focusChannel, setSelectedUser } from '../features/cabals/cabalsSlice'
import { LocalizationContext } from '../utils/Translations'
import { RootState } from '../app/rootReducer'
import Button from './Button'
import CabalList from './CabalList'
import PanelHeader from './PanelHeader'
import PanelSection from './PanelSection'
import SectionHeaderText from './SectionHeaderText'
import useIsMobile from '../hooks/useIsMobile'

const Container = styled.SafeAreaView``

const Row = styled.TouchableOpacity`
  /* cursor: pointer; */
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
`

const RowText = styled.Text`
  /* cursor: pointer; */
  font-size: 16px;
`

export default function ChannelDetailPanel() {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const renderPeerListItem = useCallback((user: UserProps) => {
    const onPressRow = () => {
      dispatch(setSelectedUser(user))
      navigation.navigate('UserProfileScreen')
    }

    return (
      <Row key={user.key} onPress={onPressRow}>
        <RowText style={{ color: colors.textSofter }}>
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

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onPressLeaveChannel = useCallback(() => {}, [])

  const onPressArchiveChannel = useCallback(() => {}, [])

  return (
    <Container>
      <PanelHeader title={t('channel_panel_header')} onPressClose={onPressClose} />
      <ScrollView>
        <PanelSection colors={colors}>
          <Button
            onPress={onPressLeaveChannel}
            style={{ maxWidth: 200, marginBottom: 16 }}
            title={t('leave_channel_button')}
          />
          <Button
            onPress={onPressArchiveChannel}
            style={{ maxWidth: 200 }}
            title={t('archive_channel_button')}
          />
        </PanelSection>
        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('channel_members_list_header')}
          </SectionHeaderText>
          {currentCabal.currentChannel.members.map(renderPeerListItem)}
        </PanelSection>
      </ScrollView>
    </Container>
  )
}
