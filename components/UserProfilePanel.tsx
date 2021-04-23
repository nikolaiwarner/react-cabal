import { ScrollView, Text, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'
import Avatar from './Avatar'
import Button from './Button'
import HelpText from './HelpText'
import PanelHeader from './PanelHeader'
import PanelSection from './PanelSection'
import SectionHeaderText from './SectionHeaderText'
import useIsMobile from '../hooks/useIsMobile'

const Container = styled.SafeAreaView``

const Name = styled.Text`
  color: ${({ colors }) => colors.text};
  font-size: 18px;
  font-weight: 700;
  margin-top: 16px;
`

const UserKey = styled.Text`
  color: ${({ colors }) => colors.textSofter};
  margin-top: 16px;
`

export default function UserProfilePanel() {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentCabal, selectedUser: user } = useSelector(
    (state: RootState) => state.cabals,
  )

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onPressToggleHidePeer = useCallback(() => {}, [])

  const onPressToggleModPeer = useCallback(() => {}, [])

  const onPressToggleAdminPeer = useCallback(() => {}, [])

  return (
    <Container style={{ backgroundColor: colors.background }}>
      <PanelHeader title={'Profile'} onPressClose={onPressClose} />
      <ScrollView>
        <PanelSection colors={colors} style={{ alignItems: 'center' }}>
          <Avatar name={user?.name} size={80} />
          <Name colors={colors}>{user?.name}</Name>
          <UserKey colors={colors}>{user?.key}</UserKey>
        </PanelSection>
        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors}>Moderation</SectionHeaderText>
          <Button
            onPress={onPressToggleHidePeer}
            style={{ maxWidth: 200, marginTop: 24 }}
            title="Hide this peer"
          />
          <HelpText colors={colors}>
            Hiding a peer hides all of their past and future messages in all channels.{' '}
          </HelpText>
          <Button
            onPress={onPressToggleModPeer}
            style={{ maxWidth: 200, marginTop: 24 }}
            title="Add moderator"
          />
          <HelpText colors={colors}>
            Adding another user as a moderator for you will apply their moderation
            settings to how you see this cabal.
          </HelpText>
          <Button
            onPress={onPressToggleAdminPeer}
            style={{ maxWidth: 200, marginTop: 24 }}
            title="Add admin"
          />
          <HelpText colors={colors}>
            Adding another user as an admin for you will apply their moderation settings
            to how you see this cabal.
          </HelpText>
        </PanelSection>
      </ScrollView>
    </Container>
  )
}
