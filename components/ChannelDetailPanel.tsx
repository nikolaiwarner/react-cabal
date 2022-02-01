import { useNavigation, useTheme } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'

import { UserProps } from '../app/types'
import { LocalizationContext } from '../utils/Translations'
import Button from './Button'

import PanelHeader from './PanelHeader'
import PanelSection from './PanelSection'
import SectionHeaderText from './SectionHeaderText'
import { useChannel } from '../lib'

export default function ChannelDetailPanel() {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)
  const { currentChannelMembers } = useChannel()

  const navigation = useNavigation()

  const renderPeerListItem = useCallback((user: UserProps) => {
    const onPressRow = () => {
      // TODO: remove redux dependency
      // dispatch(setSelectedUser(user))
      // navigation.navigate('UserProfileScreen')
    }

    return (
      <Row key={user.key} onPress={onPressRow}>
        <RowText style={{ color: colors.textSofter }}>
          <FontAwesome
            name="circle-o"
            size={12}
            color={user.online ? colors.textHighlight : colors.textSofter}
          />{' '}
          {user.name || user.key.slice(0, 5)}
        </RowText>
      </Row>
    )
  }, [])

  const onPressClose = () => {
    navigation.navigate('ChannelScreen')
  }

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
          {currentChannelMembers.map(renderPeerListItem)}
        </PanelSection>
      </ScrollView>
    </Container>
  )
}

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
