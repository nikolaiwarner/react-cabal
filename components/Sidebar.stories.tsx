import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Sidebar from './Sidebar'

import { defaultCabal } from './CabalList.stories'

export const actions = {
}

storiesOf('Sidebar', module)
  .add('default', () => <Sidebar cabal={defaultCabal} {...actions} />)
