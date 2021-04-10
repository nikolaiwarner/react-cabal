import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  addCabal,
  setCurrentCabal,
  setCurrentChannel
} from '../features/cabals/cabalsSlice'
import {
  addMessage
} from '../features/cabals/messagesSlice'

export function useRenderIpc ({ cabalKey, settings }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const incomingEvents = [{
      name: 'main:init',
      action: ({ cabalKey, data }) => {
        // focusCabal({ cabalKey, channel: settings.currentChannel })
        console.log('main:init', data)

        const users = Object.values(data.users)

        dispatch(addCabal({
          channelMembers: data.channelMembers,
          channels: data.channels,
          channelsJoined: data.channelsJoined,
          channelMessagesUnread: data.channelMessagesUnread,
          currentChannel: data.currentChannel,
          key: cabalKey,
          // messages: Array<MessageInterface>,
          username: data.username,
          users: users
        }))
        dispatch(setCurrentCabal(cabalKey))
        dispatch(setCurrentChannel({ cabalKey, channel: data.currentChannel }))

        setUsername({ cabalKey, username: 'nickwarner-web' })
      }
    }, {
      name: 'main:cabal-focus',
      action: (data) => {
        // focusCabal({ cabalKey, channel: settings.currentChannel })
        console.log('main:cabal-focus', data)
        // setCurrentChannel(settings.currentChannel)
      }
    }, {
      name: 'main:channel-focus',
      action: (data) => {
        console.log('main:channel-focus ===>', data.currentChannel, data) //{ channelsJoined, channelMembers, currentChannel, username, users }
        dispatch(setCurrentChannel({ cabalKey, channel: data.currentChannel }))
      }
    }, {
      name: 'main:channel-join',
      action: ({ channelsJoined, channelMembers, currentChannel }) => {
        dispatch(setCurrentChannel({ cabalKey, channel: currentChannel }))
      }
    }, {
      name: 'main:channel-leave',
      action: (props) => {

      }
    }, {
      name: 'main:new-channel',
      action: (props) => {

      }
    }, {
      name: 'main:new-message',
      action: (props) => {
        console.log('main:new-message', props)
        dispatch(addMessage(props))
      }
    }, {
      name: 'main:publish-message',
      action: (props) => {

      }
    }, {
      name: 'main:publish-nick',
      action: ({ name }) => {
        dispatch(publishStatusMessage({
          cabalKey,
          text: `Nick set to: ${name}`
        }))
      }
    }, {
      name: 'main:started-peering',
      action: (props) => {

      }
    }, {
      name: 'main:status-message',
      action: (props) => {

      }
    }, {
      name: 'main:stopped-peering',
      action: (props) => {

      }
    }, {
      name: 'main:topic',
      action: (props) => {

      }
    }, {
      name: 'main:user-updated',
      action: (props) => {

      }
    }]

    incomingEvents.forEach(({ name, action }) => {
      window.eventEmitter.on(name, action)
    })
  }, [])
}

export const publishMessage = ({ cabalKey, channel, message }) => {
  window.eventEmitter.emit('render:add-message', { cabalKey, channel, message })
}

export const publishStatusMessage = ({ cabalKey, channel, text }) => {
  window.eventEmitter.emit('render:add-status-message', { cabalKey, channel, text })
}

export const focusCabal = ({ cabalKey, channel }) => {
  window.eventEmitter.emit('render:cabal-focus', { cabalKey, channel })
}

export const focusChannel = ({ cabalKey, channel }) => {
  cabalKey = cabalKey || cabalKey
  window.eventEmitter.emit('render:channel-focus', { cabalKey, channel })
}

export const joinChannel = ({ cabalKey, channel }) => {
  window.eventEmitter.emit('render:channel-join', { cabalKey, channel })
}

export const setUsername = ({ cabalKey, username }) => {
  window.eventEmitter.emit('render:set-username', { cabalKey, username })
}

export const leaveChannel = ({ cabalKey, channel }) => {
  window.eventEmitter.emit('render:channel-leave', { cabalKey, channel })
}

export const removeCabal = ({ cabalKey }) => {
  window.eventEmitter.emit('render:remove-cabal', { cabalKey })
}

export const setChannelTopic = ({ cabalKey, channel, topic }) => {
  window.eventEmitter.emit('render:set-channel-topic', { cabalKey, channel, topic })
}
