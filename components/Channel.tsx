import React from 'react'
import styled from 'styled-components/native'

import { CabalProps, ChannelProps } from '../app/types'
import ChannelHeader from './ChannelHeader'
import MessageComposer from './MessageComposer'
import MessageList from './MessageList'

const ChannelContainer = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  background: #fff;
`

export default function Channel() {
  return (
    <ChannelContainer>
      <ChannelHeader />
      {/* <MessageList />  */}
      {/* <MessageComposer /> */}
    </ChannelContainer>
  )
}
