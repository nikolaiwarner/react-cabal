import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Cabal from './Cabal'

import { defaultCabal, defaultCabals } from './CabalList.stories'

export const actions = {
  onClick: action('onClick')
}

storiesOf('Cabal', module)
  .add('default', () => <Cabal cabals={defaultCabals} currentCabal={defaultCabal} {...actions} />)
