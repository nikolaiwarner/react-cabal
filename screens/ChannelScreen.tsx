import { SafeAreaView } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import ChannelHeader from '../components/ChannelHeader'
import MessageComposer from '../components/MessageComposer'
import MessageList from '../components/MessageList'

const ChannelContainer = styled.SafeAreaView`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
`

export default function ChannelScreen({ navigation }) {
  return (
    <ChannelContainer>
      <ChannelHeader />
      <MessageList />
      <MessageComposer />
    </ChannelContainer>
  )
}
