import React from 'react'
import { storiesOf } from '@storybook/react'

import Channel from './Channel'
import { manyMessages } from './MessageList.stories'
import { defaultCabal } from './CabalList.stories'

export const defaultUser = {
  nickname: 'person',
  online: true
}

export const defaultUsers = [
  { ...defaultUser, nickname: 'person' },
  { ...defaultUser, nickname: 'friend' },
  { ...defaultUser, nickname: 'ally' },
  { ...defaultUser, nickname: 'pal', online: false },
  { ...defaultUser, nickname: 'conspirator', online: false }
]

export const defaultChannel = {
  messages: manyMessages,
  name: 'solarpunk',
  topic: 'good times under the sun',
  users: defaultUsers
}

export const manyUsers = [
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers
]

storiesOf('Channel', module)
  .add('default', () => <Channel cabalKey={defaultCabal} channel={defaultChannel} />)
