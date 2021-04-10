import React from 'react'
import { storiesOf } from '@storybook/react'

import MessageComposer from './MessageComposer'
import { defaultChannel } from './Channel.stories'

storiesOf('MessageComposer', module)
  .add('default', () => <MessageComposer {...defaultChannel} />)
