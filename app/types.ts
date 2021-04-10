export interface CabalsProps {
  cabalKeys: string[]
  cabals: CabalProps[]
  cabalSettingsModalVisible: boolean
  channelBrowserModalVisible: boolean
  currentCabalKey: string | null
  currentChannel: string
  currentScreen: 'addCabal' | 'main' | 'loading' | 'settings'
  emojiPickerModalVisible: boolean
}

export interface CabalProps {
  channelMembers: UserProps[]
  channelMessagesUnread: object
  channels: string[]
  channelsJoined: string[]
  currentChannel: string
  key: string
  messages: MessageProps[]
  username: string
  users: UserProps[]
}

export interface CabalChannelProps {
  cabalKey: string
  channel: string
}

export interface CabalProps {
  messages: MessageProps[]
  name?: string
  topic?: string
}

export interface ChannelProps {
  messages: MessageProps[]
  name: string
  topic: string
}

export interface UserProps {
  key: string
  name: string
}

export interface MessageProps {
  content: string
  time: Date
  user: UserProps
}
