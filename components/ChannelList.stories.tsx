import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ChannelList from './ChannelList'

import { defaultChannel } from './Channel.stories'

export const defaultChannels = [
  { ...defaultChannel, name: 'arts' },
  { ...defaultChannel, name: 'crafts' },
  { ...defaultChannel, name: 'dance' },
  { ...defaultChannel, name: 'default' },
  { ...defaultChannel, name: 'film' },
  { ...defaultChannel, name: 'music' },
  { ...defaultChannel, name: 'solarpunk' },
  { ...defaultChannel, name: 'the galley' }
]

export const manyChannels = [
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels
]

export const actions = {
  onClick: action('onClick')
}

storiesOf('ChannelList', module)
  .add('default', () => <ChannelList channels={defaultChannels} {...actions} />)
  .add('many channels', () => <ChannelList channels={manyChannels} {...actions} />)
  .add('loading', () => <ChannelList channels={[]} {...actions} loading />)
  .add('empty', () => <ChannelList channels={[]} {...actions} />)
