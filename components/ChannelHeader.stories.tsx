import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ChannelHeader from './ChannelHeader'
import { defaultChannel } from './Channel.stories'

export const actions = {
  onClickSettings: action('onClickSettings'),
  onClickTopic: action('onClickTopic')
}

storiesOf('ChannelHeader', module)
  .add('default', () => <ChannelHeader channel={defaultChannel} {...actions} />)
