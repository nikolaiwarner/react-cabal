import React from 'react'
import { storiesOf } from '@storybook/react'

import Message from './Message'

export const message = {
  nickname: 'person',
  content: 'Hello friends!',
  time: new Date(2019, 8, 21, 12, 0)
}

export const longMessage = {
  nickname: 'person',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  time: new Date(2019, 8, 21, 12, 0)
}

storiesOf('Message', module)
  .add('default', () => <Message message={message} />)
  .add('repeat author', () => <Message message={message} repeatedNickname={message.nickname} />)
  .add('long message', () => <Message message={longMessage} />)
