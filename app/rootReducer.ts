import { combineReducers } from '@reduxjs/toolkit'

import cabalsSlice from '../features/cabals/cabalsSlice'
import messagesSlice from '../features/cabals/messagesSlice'
import themesSlice from '../features/themes/themesSlice'

const rootReducer = combineReducers({
  cabals: cabalsSlice,
  messages: messagesSlice,
  themes: themesSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
