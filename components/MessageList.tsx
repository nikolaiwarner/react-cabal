import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'
import Message from './Message'

const MessageListContainer = styled.ScrollView`
  overflow: scroll;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`

const StarterMessage = styled.View`
  flex-grow: 1;
  margin: 1rem;
  overflow: scroll;
`

export default function MessageList() {
  const dispatch = useDispatch()
  const { messages } = useSelector((state: RootState) => state.messages)

  console.log({ messages })

  if (messages.length === 0) {
    return (
      <StarterMessage>
        {/* This is a new channel. Send a message to start things off */}
      </StarterMessage>
    )
  } else {
    let lastMessageUserKey = null
    return (
      <MessageListContainer>
        {messages.map((message, index) => {
          const repeatedName = message.user.key === lastMessageUserKey
          lastMessageUserKey = message.user.key
          return <Message key={index} message={message} repeatedName={repeatedName} />
        })}
      </MessageListContainer>
    )
  }
}
