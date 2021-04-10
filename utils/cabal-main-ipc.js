import Client from 'cabal-client'

// const { ipcMain } = require('electron')
// ipc = electron.ipcMain

const DEFAULT_CHANNEL = 'default'
const HOME_DIR = '' // TODO
const DATA_DIR = '' // TODO
const STATE_FILE = '' // TODO
const DEFAULT_PAGE_SIZE = 100
const MAX_FEEDS = 1000

let client
let loadedCabalKeys = []

export const initializeClient = ({ dataDir, maxFeeds, eventEmitter }) => {
  client = new Client({
    maxFeeds: maxFeeds || MAX_FEEDS,
    config: {
      dbdir: dataDir || DATA_DIR,
    },
  })

  eventEmitter.on('render:add-message', ({ cabalKey, message }) => {
    const cabalDetails = client.getDetails(cabalKey)
    cabalDetails.publishMessage(message)
  })

  eventEmitter.on('render:add-status-message', ({ cabalKey, channel, text }) => {
    const cabalDetails = client.getDetails(cabalKey)
    channel = channel || cabalDetails.getCurrentChannel()
    client.addStatusMessage({ text }, channel, cabalDetails._cabal)
  })

  eventEmitter.on('render:cabal-focus', ({ cabalKey, channel }) => {
    client.focusCabal(cabalKey)
  })

  eventEmitter.on('render:cabal-join', ({ cabalKey, channel }) => {
    console.log('main', 'render:cabal-join', cabalKey)
    initializeCabal({ cabalKey, channel, eventEmitter })
  })

  eventEmitter.on('render:channel-focus', ({ cabalKey, channel }) => {
    const cabalDetails = client.getDetails(cabalKey)
    cabalDetails.focusChannel(channel)
    console.log('main', 'render:channel-focus', { cabalKey, channel })
  })

  eventEmitter.on('render:channel-join', ({ cabalKey, channel }) => {
    console.log('main', 'render:channel-join', { cabalKey, channel })
    if (channel && channel.length > 0) {
      const cabalDetails = client.getDetails(cabalKey)
      cabalDetails.joinChannel(channel)
      // TODO:
      // addChannel({ cabalKey, channel })
      // viewChannel({ cabalKey, channel })
    }
  })

  eventEmitter.on('render:channel-leave', (props) => {})

  eventEmitter.on('render:remove-cabal', (props) => {})

  eventEmitter.on('render:set-channel-topic', (props) => {})

  eventEmitter.on('render:set-username', ({ cabalKey, username }) => {
    console.log('main', 'render:set-username', { cabalKey, username })
    const cabalDetails = client.getDetails(cabalKey)
    const currentUsername = cabalDetails.getLocalName()
    if (username !== currentUsername) {
      cabalDetails.publishNick(username)
    }
  })

  console.log('--> MainIpc: initialized')
  return client
}

export const initializeCabal = async ({ cabalKey, nickname, settings, eventEmitter }) => {
  const isNew = !cabalKey
  let cabalDetails
  if (loadedCabalKeys.includes(cabalKey)) {
    cabalDetails = client.getDetails(cabalKey)
  } else {
    cabalDetails = isNew ? await client.createCabal() : await client.addCabal(cabalKey)
    cabalKey = cabalDetails.key
    loadedCabalKeys.push(cabalKey)
  }

  const cabalDetailsEvents = [
    {
      name: 'cabal-focus',
      action: () => {},
    },
    {
      name: 'channel-focus',
      action: () => {
        eventEmitter.emit('main:channel-focus', {
          cabalKey,
          data: {
            channelsJoined: cabalDetails.getJoinedChannels(),
            channelMembers: cabalDetails.getChannelMembers(),
            // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
            currentChannel: cabalDetails.getCurrentChannel(),
            username: cabalDetails.getLocalName(),
            users: cabalDetails.getUsers(),
          },
        })
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'channel-join',
      action: () => {
        eventEmitter.emit('main:channel-join', {
          cabalKey,
          data: {
            channelMembers: cabalDetails.getChannelMembers(),
            // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
            channelsJoined: cabalDetails.getJoinedChannels(),
            currentChannel: cabalDetails.getCurrentChannel(),
          },
        })
        // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'channel-leave',
      action: () => {
        eventEmitter.emit('main:channel-leave', {
          cabalKey,
          data: {
            // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
            channelsJoined: cabalDetails.getJoinedChannels(),
          },
        })
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'init',
      action: () => {
        setTimeout(() => {
          eventEmitter.emit('main:init', {
            cabalKey,
            data: {
              users: cabalDetails.getUsers(),
              username: cabalDetails.getLocalName(),
              channels: cabalDetails.getChannels(),
              channelsJoined: cabalDetails.getJoinedChannels() || [],
              // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
              currentChannel: cabalDetails.getCurrentChannel(),
              channelMembers: cabalDetails.getChannelMembers(),
            },
          })

          // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
          // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
        }, 2000)
      },
    },
    {
      name: 'new-channel',
      action: () => {
        eventEmitter.emit('main:new-channel', {
          cabalKey,
          data: {
            channels: cabalDetails.getChannels(),
            channelMembers: cabalDetails.getChannelMembers(),
          },
        })
      },
    },
    {
      name: 'new-message',
      action: (data) => {
        eventEmitter.emit('main:new-message', {
          cabalKey,
          data,
        })
        // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'publish-message',
      action: () => {
        eventEmitter.emit('main:publish-message', {
          cabalKey,
          data: {
            // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
            currentChannel: cabalDetails.getCurrentChannel(),
          },
        })
        // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'publish-nick',
      action: () => {
        eventEmitter.emit('main:publish-nick', {
          cabalKey,
          data: {
            users: cabalDetails.getUsers(),
          },
        })
      },
    },
    {
      name: 'started-peering',
      action: () => {
        eventEmitter.emit('main:started-peering', {
          cabalKey,
          data: {
            users: cabalDetails.getUsers(),
          },
        })
      },
    },
    {
      name: 'status-message',
      action: () => {
        eventEmitter.emit('main:status-message', {
          cabalKey,
          data: {
            // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
            currentChannel: cabalDetails.getCurrentChannel(),
          },
        })
        // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
        // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
      },
    },
    {
      name: 'stopped-peering',
      action: () => {
        eventEmitter.emit('main:stopped-peering', {
          cabalKey,
          data: {
            users: cabalDetails.getUsers(),
          },
        })
      },
    },
    {
      name: 'topic',
      action: () => {
        eventEmitter.emit('main:topic', {
          cabalKey,
          data: {
            topic: cabalDetails.getTopic(),
          },
        })
      },
    },
    {
      name: 'user-updated',
      action: () => {
        eventEmitter.emit('main:user-updated', {
          cabalKey,
          data: {
            users: cabalDetails.getUsers(),
          },
        })
      },
    },
  ]
  cabalDetailsEvents.forEach((event) => {
    cabalDetails.on(event.name, (data) => {
      event.action(data)
    })
  })

  const outgoingCabalDetailsEvents = [
    'main:cabal-focus',
    'main:channel-focus',
    'main:channel-join',
    'main:channel-leave',
    'main:new-channel',
    'main:new-message',
    'main:publish-message',
    'main:publish-nick',
    'main:started-peering',
    'main:status-message',
    'main:stopped-peering',
    'main:topic',
    'main:user-updated',
  ]
  outgoingCabalDetailsEvents.forEach((eventName) => {
    cabalDetails.on(eventName, (data) => {
      console.log('--> event:' + eventName)
      eventEmitter.emit(eventName, data)
    })
  })

  client.focusCabal(cabalKey)

  setTimeout(() => {
    eventEmitter.emit('main:init', {
      cabalKey,
      data: {
        users: cabalDetails.getUsers(),
        username: cabalDetails.getLocalName(),
        channels: cabalDetails.getChannels(),
        channelsJoined: cabalDetails.getJoinedChannels() || [],
        // channelMessagesUnread: getCabalUnreadMessagesCount(cabalDetails),
        currentChannel: cabalDetails.getCurrentChannel(),
        channelMembers: cabalDetails.getChannelMembers(),
      },
    })

    // dispatch(getMessages({ addr, amount: 1000, channel: currentChannel }))
    // dispatch(updateAllsChannelsUnreadCount({ addr, channelMessagesUnread }))
  }, 2000)
}

export default {
  initializeClient,
}
