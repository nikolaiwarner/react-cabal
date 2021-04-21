import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import moment from 'moment'
// import remark from 'remark'
// import remarkEmoji from 'remark-emoji'
// import remarkReact from 'remark-react'
// import throttle from 'lodash.throttle'

import { AppThunk } from '../../app/store'
import { listCommands, processCommand } from '../../utils/textInputCommands'
import { generateUniqueName } from '../../utils/helpers'
// import {
//   focusChannel as sendFocusChannel,
//   joinChannel as sendJoinChannel,
//   leaveChannel as sendLeaveChannel,
//   removeCabal as sendRemoveCabal,
//   setChannelTopic as sendSetChannelTopic,
//   setUsername as sendSetUsername,
//   focusCabal as sendfocusCabal,
// } from '../../utils/cabal-render-ipc'
import { AppProps, CabalChannelProps, ChannelProps } from '../../app/types'

import { defaultCabal, defaultCabals } from '../../utils/fakeData'

interface TextInputCommandProps {
  cabalKey: string
  text: string
}

console.log({ defaultCabal })

const initialState: AppProps = {
  cabalKeys: ['1eef9ad64e284691b7c6f6310e39204b5f92765e36102046caaa6a7ff8c02d74'],
  cabals: defaultCabals,
  cabalSettingsModalVisible: false,
  channelBrowserModalVisible: false,
  currentCabal: defaultCabal,
  currentScreen: 'loading',
  emojiPickerModalVisible: false,
}

const cabalsSlice = createSlice({
  name: 'cabals',
  initialState,
  reducers: {
    addCabal(state, action) {
      state.cabals.push(action.payload)
    },
    addCabalKey(state, action) {
      state.cabalKeys.push(action.payload)
    },
    hideAllModals(state) {
      state.emojiPickerModalVisible = false
      state.channelBrowserModalVisible = false
      state.cabalSettingsModalVisible = false
    },
    setEmojiPickerModalVisible(state, action: PayloadAction<boolean>) {
      state.emojiPickerModalVisible = action.payload
    },
    setCabalSettingsModalVisible(state, action: PayloadAction<boolean>) {
      state.cabalSettingsModalVisible = action.payload
    },
    setChannelBrowserModalVisible(state, action: PayloadAction<boolean>) {
      state.channelBrowserModalVisible = action.payload
    },
    setCurrentCabal(state, action: PayloadAction<CabalChannelProps>) {
      const cabal = state.cabals.find((cabal) => cabal.key === action.payload.cabalKey)
      if (cabal) {
        state.currentCabal = cabal
      }
    },
    setCurrentChannel(state, action: PayloadAction<CabalChannelProps>) {
      console.log('setCurrentChannel', action)
      state.currentCabal.currentChannel = action.payload.channel
    },
    setCurrentScreen(state, action: PayloadAction<any>) {
      state.currentScreen = action.payload
    },
    updateCabal(state, action) {
      const updatedCabal = action.payload
      const cabals = state.cabals.map((cabal) => {
        if (cabal.key === updatedCabal.key) {
          return updatedCabal
        } else {
          return cabal
        }
      })
      state.cabals = cabals
    },
  },
})

export const {
  addCabal,
  addCabalKey,
  hideAllModals,
  setCabalSettingsModalVisible,
  setChannelBrowserModalVisible,
  setCurrentCabal,
  setCurrentChannel,
  setCurrentScreen,
  setEmojiPickerModalVisible,
} = cabalsSlice.actions

export default cabalsSlice.reducer

export const focusCabal = (props: CabalChannelProps): AppThunk => async (dispatch) => {
  // sendfocusCabal(props)

  dispatch(setCurrentCabal({ cabalKey: props.cabalKey }))
  if (props.channel) {
    dispatch(focusChannel(props))
  }
  dispatch(hideAllModals())
}

export const focusChannel = (props: CabalChannelProps): AppThunk => async (dispatch) => {
  // sendFocusChannel(props)
  dispatch(setCurrentChannel(props))
}

export const joinChannel = (props: CabalChannelProps): AppThunk => async (dispatch) => {
  // sendJoinChannel(props)
  dispatch(setCurrentChannel(props))
}

export const leaveChannel = (props: CabalChannelProps): AppThunk => async (dispatch) => {
  // sendLeaveChannel(props)
}

export const listTextInputCommands = (): AppThunk => async (dispatch) => {
  // dispatch(listCommands())
}

export const onTextInputCommand = (props: TextInputCommandProps): AppThunk => async (
  dispatch,
) => {
  // dispatch(processCommand(props))
}

export const removeCabal = ({ cabalKey }: { cabalKey: string }): AppThunk => async (
  dispatch,
) => {
  // sendRemoveCabal({ cabalKey })
}

export const saveCabalSettings = (): AppThunk => async (dispatch) => {}

export const setChannelTopic = ({
  cabalKey,
  channel,
  topic,
}: {
  cabalKey: string
  channel: string
  topic: string
}): AppThunk => async (dispatch) => {
  // sendSetChannelTopic({ cabalKey, channel, topic })
}

export const setUsername = ({
  cabalKey,
  username,
}: {
  cabalKey: string
  username: string
}): AppThunk => async (dispatch) => {
  // sendSetUsername({ cabalKey, username })
}

export const showChannelBrowserModal = (): AppThunk => async (dispatch) => {
  dispatch(setChannelBrowserModalVisible(true))
}

export const showScreen = (screenName: string): AppThunk => async (dispatch) => {
  dispatch(hideAllModals())
  dispatch(setCurrentScreen(screenName))
}
