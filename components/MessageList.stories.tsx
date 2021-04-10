import React from 'react'
import { storiesOf } from '@storybook/react'

import MessageList from './MessageList'
import { longMessage } from './Message.stories'

export const defaultProps = {
  nickname: 'person'
}

export const defaultMessages = [
  {
    nickname: 'person',
    content: 'Hello friends!',
    time: new Date(2019, 8, 21, 12, 0)
  },
  {
    nickname: 'person',
    content: 'welcome to cabal :D',
    time: new Date(2019, 8, 21, 12, 1)
  },
  {
    nickname: 'friend',
    content: 'person: Thanks! So happy to be here! ❤️',
    time: new Date(2019, 8, 21, 12, 2)
  }
]

export const manyMessages = [
  ...defaultMessages,
  longMessage,
  ...defaultMessages,
  ...defaultMessages,
  longMessage,
  ...defaultMessages,
  ...defaultMessages,
  longMessage,
  ...defaultMessages
]

storiesOf('MessageList', module)
  .add('default', () => <MessageList messages={defaultMessages} {...defaultProps} />)
  .add('many messages', () => <MessageList messages={manyMessages} {...defaultProps} />)
  .add('loading', () => <MessageList messages={[]} {...defaultProps} loading />)
  .add('empty', () => <MessageList messages={[]} {...defaultProps} />)
