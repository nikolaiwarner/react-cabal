import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Avatar from './Avatar'
import { message } from './Message.stories';

export const actions = {
  onClick: action('onClick')
}

storiesOf('Avatar', module)
  .add('default', () => <Avatar name={message.nickname} {...actions} />)
