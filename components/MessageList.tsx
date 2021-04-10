import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'
import Message from './Message'

const MessageListContainer = styled.View`
  flex-grow: 1;
  overflow: scroll;
`

const StarterMessage = styled.View`
  color: #aaa;
  flex-grow: 1;
  margin: 1rem;
  overflow: scroll;
`

export default function MessageList({ onScroll }) {
  const dispatch = useDispatch()
  const { messages } = useSelector((state: RootState) => state.messages)

  if (messages.length === 0) {
    return (
      <StarterMessage>
        This is a new channel. Send a message to start things off!
      </StarterMessage>
    )
  } else {
    let lastMessageUserKey = null
    return (
      <MessageListContainer onScroll={onScroll}>
        {messages.map((message, index) => {
          const repeatedName = message.user.key === lastMessageUserKey
          lastMessageUserKey = message.user.key
          return <Message key={index} message={message} repeatedName={repeatedName} />
        })}
      </MessageListContainer>
    )
  }
}

MessageList.propTypes = {
  // messages: PropTypes.array.isRequired,
  // name: PropTypes.string,
  onScroll: PropTypes.func,
}
