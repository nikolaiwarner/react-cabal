import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PeerList from './PeerList'

import { defaultChannel, manyUsers } from './Channel.stories'

export const actions = {
  onClick: action('onClick')
}

storiesOf('PeerList', module)
  .add('default', () => <PeerList channel={defaultChannel} {...actions} />)
  .add('many peers', () => <PeerList channel={{ ...defaultChannel, users: manyUsers }} {...actions} />)
  .add('loading', () => <PeerList channel={{ ...defaultChannel, users: [] }} {...actions} loading />)
  .add('empty', () => <PeerList channel={{ ...defaultChannel, users: [] }} {...actions} />)
