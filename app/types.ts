export interface AppProps {
  cabalKeys: string[]
  cabals: CabalProps[]
  cabalSettingsModalVisible: boolean
  channelBrowserModalVisible: boolean
  currentCabal?: CabalProps
  currentScreen: 'addCabal' | 'main' | 'loading' | 'settings'
  emojiPickerModalVisible: boolean
}

export interface CabalProps {
  channels: ChannelProps[]
  channelsJoined: ChannelProps[]
  channelsStarred: ChannelProps[]
  currentChannel: ChannelProps
  key: string
  name?: string
  username: string
  users: UserProps[]
}

export interface CabalChannelProps {
  cabalKey: string
  channel?: ChannelProps
}

export interface ChannelProps {
  members: UserProps[]
  name: string
  topic: string
}

export interface UserProps {
  key: string
  name: string
  online: boolean
}

export interface MessageProps {
  content: string
  timestamp: string
  user: UserProps
}
