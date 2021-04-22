export interface AppProps {
  cabalKeys: string[]
  cabals: CabalProps[]
  cabalSettingsModalVisible: boolean
  channelBrowserModalVisible: boolean
  currentCabal?: CabalProps
  currentScreen: 'addCabal' | 'main' | 'loading' | 'settings'
  emojiPickerModalVisible: boolean
  selectedUser: UserProps
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

export interface LocalizationContextProps {
  locale: string
  setLocale: React.Dispatch<React.SetStateAction<string>>
  t: (scope: string, options?) => string
}

export interface MessageProps {
  content: string
  timestamp: string
  user: UserProps
}

export interface UserProps {
  key: string
  name: string
  online: boolean
}
