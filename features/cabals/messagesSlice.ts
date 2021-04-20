import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
// import remark from 'remark'
// import remarkEmoji from 'remark-emoji'
// import remarkReact from 'remark-react'
// import throttle from 'lodash.throttle'

import { AppThunk } from '../../app/store'
import { generateUniqueName } from '../../utils/helpers'
import { listCommands, processCommand } from '../../utils/textInputCommands'
import { MessageProps } from '../../app/types'

import { defaultMessages, manyMessages } from '../../utils/fakeData'

// import {
//   publishMessage as sendPublishMessage,
//   publishStatusMessage as sendPublishStatusMessage,
// } from '../../utils/cabal-render-ipc'

interface MessagesProps {
  messages: MessageProps[]
}

interface TextInputCommandProps {
  cabalKey: string
  text: string
}

let initialState: MessagesProps = {
  messages: manyMessages,
}

const cabalsSlice = createSlice({
  name: 'cabals',
  initialState,
  reducers: {
    addMessage(state, action) {
      console.log('addMessageaddMessage', action.payload)
      state.messages.push(action.payload)
    },
  },
})

export const { addMessage } = cabalsSlice.actions

export default cabalsSlice.reducer

export const publishMessage = ({
  cabalKey,
  channel,
  message,
}: {
  cabalKey: string
  channel: string
  message: string
}): AppThunk => async (dispatch) => {
  // sendPublishMessage({ cabalKey, channel, message })
}

export const publishStatusMessage = ({
  cabalKey,
  channel,
  text,
}: {
  cabalKey: string
  channel: string
  text: string
}): AppThunk => async (dispatch) => {
  // sendPublishStatusMessage({ cabalKey, channel, text })
}

export const listTextInputCommands = (): AppThunk => async (dispatch) => {
  // dispatch(listCommands())
}

export const onTextInputCommand = (props: TextInputCommandProps): AppThunk => async (
  dispatch,
) => {
  // dispatch(processCommand(props))
}
