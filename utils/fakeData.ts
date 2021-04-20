import { CabalProps, ChannelProps, MessageProps, UserProps } from '../app/types'

export const defaultUser: UserProps = {
  key: '1234',
  name: 'person',
  online: true,
}

export const defaultUsers: UserProps[] = [
  defaultUser,
  { ...defaultUser, key: '1235', name: 'friend' },
  { ...defaultUser, key: '1236', name: 'ally' },
  { ...defaultUser, key: '1237', name: 'pal', online: false },
  { ...defaultUser, key: '1238', name: 'conspirator', online: false },
]

export const manyUsers: UserProps[] = [
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers,
  ...defaultUsers,
]

export const message: MessageProps = {
  user: defaultUser,
  content: 'Hello friends!',
  time: new Date(2019, 8, 21, 12, 0),
}

export const longMessage: MessageProps = {
  user: defaultUser,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  time: new Date(2019, 8, 21, 12, 0),
}

export const longMessageOtherUser: MessageProps = {
  ...longMessage,
  user: defaultUsers[1],
}

export const defaultMessages: MessageProps[] = [
  {
    user: defaultUser,
    content: 'Hello friends!',
    time: new Date(2019, 8, 21, 12, 0),
  },
  {
    user: defaultUsers[1],
    content: 'welcome to cabal :D',
    time: new Date(2019, 8, 21, 12, 1),
  },
  {
    user: defaultUsers[2],
    content: 'person: Thanks! So happy to be here! ❤️',
    time: new Date(2019, 8, 21, 12, 2),
  },
]

export const manyMessages: MessageProps[] = [
  ...defaultMessages,
  longMessage,
  ...defaultMessages,
  ...defaultMessages,
  longMessage,
  ...defaultMessages,
  ...defaultMessages,
  longMessage,
  ...defaultMessages,
]

export const defaultChannel: ChannelProps = {
  members: defaultUsers,
  name: 'default',
  topic: 'the most default of all channels',
}

export const defaultChannels: ChannelProps[] = [
  { ...defaultChannel, name: 'arts' },
  { ...defaultChannel, name: 'crafts' },
  { ...defaultChannel, name: 'dance' },
  { ...defaultChannel, name: 'film' },
  { ...defaultChannel, name: 'music' },
  { ...defaultChannel, name: 'solarpunk' },
  { ...defaultChannel, name: 'the galley' },
]

export const manyChannels: ChannelProps[] = [
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels,
  ...defaultChannels,
]

export const defaultCabal: CabalProps = {
  channels: defaultChannels,
  channelsJoined: defaultChannels.slice(0, 3),
  channelsStarred: [defaultChannels[1]],
  currentChannel: defaultChannels[0],
  key: '0201400f1aa2e3076a3f17f4521b2cc41e258c446cdaa44742afe6e1b9fd5f82',
  name: 'Cabal Club',
  username: 'nickwarner',
  users: defaultUsers,
}

export const defaultCabals: CabalProps[] = [
  defaultCabal,
  { ...defaultCabal, key: '7c6f63f92765e36102' },
  { ...defaultCabal, key: '04b51eef9ad64e2841' },
  { ...defaultCabal, key: 'f63f92765e36102046' },
  { ...defaultCabal, key: '521b2cc41e258c446c' },
]

export const manyCabals: CabalProps[] = [
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals,
  ...defaultCabals,
]
