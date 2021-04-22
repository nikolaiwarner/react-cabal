import { SafeAreaView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import ChannelDetailPanel from '../components/ChannelDetailPanel'
import ChannelHeader from '../components/ChannelHeader'
import MessageComposer from '../components/MessageComposer'
import MessageList from '../components/MessageList'
import useIsMobile from '../hooks/useIsMobile'

const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`

const ChannelContainerWrapper = styled.View`
  display: flex;
  flex-grow: 1;
  height: 100vh;
`

const ChannelContainer = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
`

const Panel = styled.View`
  border-left-color: ${({ colors }) => colors.border};
  border-left-width: 1px;
  /* height: 100%; */
  width: 300px;
`

export default function ChannelScreen({ navigation }) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  return (
    <Container>
      <ChannelContainerWrapper>
        <ChannelContainer>
          <ChannelHeader />
          <MessageList />
          <MessageComposer />
        </ChannelContainer>
      </ChannelContainerWrapper>
      {!isMobile && (
        <Panel colors={colors}>
          <ChannelDetailPanel />
        </Panel>
      )}
    </Container>
  )
}
