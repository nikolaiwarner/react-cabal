import {
  setUsername,
  joinChannel,
  leaveChannel,
  removeCabal,
  setChannelTopic,
  saveCabalSettings
} from '../features/cabals/cabalsSlice'
import {
  publishMessage,
  publishStatusMessage
} from '../features/cabals/messagesSlice'

export const listCommands = (cabalKey) => {
  const commands = {
    help: {
      help: () => 'display this help message',
      call: (arg) => {
        var helpContent = ''
        for (var key in commands) {
          helpContent = helpContent + `/${key} - ${commands[key].help()} \n`
        }
        publishStatusMessage({ cabalKey, text: helpContent })
      }
    },
    nick: {
      help: () => 'change your display name',
      call: (arg) => {
        var username = arg
        if (!username.length) return
        if (username && username.trim().length > 0) {
          setUsername({ cabalKey, username })
        }
      }
    },
    emote: {
      help: () => 'write an old-school text emote',
      call: (arg) => {
        publishMessage({
          text: arg,
          type: 'chat/emote'
        })
      }
    },
    join: {
      help: () => 'join a new channel',
      call: (arg) => {
        var channel = arg || 'default'
        joinChannel({ cabalKey, channel })
      }
    },
    leave: {
      help: () => 'leave a channel',
      call: (arg) => {
        var channel = arg
        leaveChannel({ cabalKey, channel })
      }
    },
    // quit: {
    //   help: () => 'exit the cabal process',
    //   call: (arg) => {
    //     // TODO
    //     // process.exit(0)
    //   }
    // },
    topic: {
      help: () => 'set the topic/description/"message of the day" for a channel',
      call: (arg) => {
        var topic = arg
        if (topic && topic.trim().length > 0) {
          setChannelTopic({ cabalKey, topic })
        }
      }
    },
    // whoami: {
    //   help: () => 'display your local user key',
    //   call: (arg) => {
    //     // TODO
    //     // view.writeLine.bind(view)('Local user key: ' + cabal.client.user.key)
    //   }
    // },
    alias: {
      help: () => 'set alias for the cabal',
      call: (arg) => {
        saveCabalSettings({
          cabalKey,
          settings: {
            alias: arg
          }
        })
      }
    },
    // add: {
    //   help: () => 'add a cabal',
    //   call: (arg) => {
    //     addAnotherCabal(arg)
    //   }
    // },
    remove: {
      help: () => 'remove cabal from Cabal Desktop',
      call: (arg) => {
        cabalKey = arg || cabalKey
        removeCabal({ cabalKey })
      }
    }
  }

  const alias = (command, alias) => {
    commands[alias] = {
      help: commands[command].help,
      call: commands[command].call
    }
  }

  // add aliases to commands
  alias('emote', 'me')
  alias('join', 'j')
  alias('nick', 'n')
  alias('topic', 'motd')
  // alias('whoami', 'key')

  return commands
}

export const processCommand = ({ cabalKey, text }) => {
  const commands = listCommands(cabalKey)

  const pattern = (/^\/(\w*)\s*(.*)/)
  const m = pattern.exec(text) || []
  const cmd = m[1] ? m[1].trim() : ''
  const arg = m[2] ? m[2].trim() : ''

  if (cmd in commands) {
    commands[cmd].call(arg)
  } else if (cmd) {
    text = `/${cmd} is not yet a command. \nTry /help for a list of command descriptions`
    publishStatusMessage({ cabalKey, text })
  }
}

export default {
  listCommands,
  processCommand
}
