import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps, UserProps } from '../app/types'
import { color } from 'react-native-reanimated'
import { focusChannel } from '../features/cabals/cabalsSlice'
import { RootState } from '../app/rootReducer'
import CabalList from './CabalList'
import PanelHeader from './PanelHeader'
import useIsMobile from '../hooks/useIsMobile'

const ChannelDetailPaneContainer = styled.SafeAreaView``

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

export default function ChannelDetailPane() {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const navigation = useNavigation()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  return (
    <ChannelDetailPaneContainer style={{ backgroundColor: colors.background }}>
      <PanelHeader title={'Profile'} onPressClose={onPressClose} />
      <ScrollView>
        <Text>avatar</Text>
        <Text>name</Text>
        <Text>key</Text>
        <Text>
          Moderation Hide this peer Hiding a peer hides all of their past and future
          messages in all channels. Add moderator Adding another user as a moderator for
          you will apply their moderation settings to how you see this cabal. Add admin
          Adding another user as an admin for you will apply their moderation
        </Text>
      </ScrollView>
    </ChannelDetailPaneContainer>
  )
}
