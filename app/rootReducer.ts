import { combineReducers } from '@reduxjs/toolkit'

import cabalsSlice from '../features/cabals/cabalsSlice'
import messagesSlice from '../features/cabals/messagesSlice'

const rootReducer = combineReducers({
  cabals: cabalsSlice,
  messages: messagesSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
