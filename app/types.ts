export interface AppProps {
  cabalKeys: string[]
  cabals: CabalProps[]
  cabalSettingsModalVisible: boolean
  channelBrowserModalVisible: boolean
  currentCabal?: CabalProps
  currentScreen: 'addCabal' | 'main' | 'loading' | 'settings'
  emojiPickerModalVisible: boolean
  selectedUser: UserProps
  sidebarLists: SidebarListsProps
}

export interface CabalProps {
  channels: ChannelProps[]
  channelsJoined: ChannelProps[]
  channelsFavorites: ChannelProps[]
  currentChannel: ChannelProps
  id: string
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
  key: string
  timestamp: string
  user: UserProps
}

export interface UserProps {
  key: string
  name: string
  online: boolean
}

export type SidebarListsProps = SidebarListProps[]

export interface SidebarListProps {
  id: string
  open: boolean
  title?: string
}
