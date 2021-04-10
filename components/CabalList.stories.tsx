import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import CabalList from './CabalList'

import { defaultChannels } from './ChannelList.stories'

export const defaultCabal = {
  key: '0201400f1aa2e3076a3f17f4521b2cc41e258c446cdaa44742afe6e1b9fd5f82',
  channels: defaultChannels,
  currentChannel: defaultChannels[0]
}

export const defaultCabals = [
  defaultCabal,
  { ...defaultCabal, key: '321' },
  { ...defaultCabal, key: '123' },
  { ...defaultCabal, key: 'asd' },
  { ...defaultCabal, key: 'fds' }
]

export const manyCabals = [
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals
]

export const actions = {
  onClick: action('onClick')
}

storiesOf('CabalList', module)
  .add('default', () => <CabalList cabals={defaultCabals} {...actions} />)
  .add('many cabals', () => <CabalList cabals={manyCabals} {...actions} />)
  .add('loading', () => <CabalList cabals={[]} {...actions} loading />)
  .add('empty', () => <CabalList cabals={[]} {...actions} />)
