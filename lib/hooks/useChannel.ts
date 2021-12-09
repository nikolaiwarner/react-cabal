import { useState, useEffect, useRef } from 'react'
import { useCabal } from './useCabal'

export function useChannel() {
  const [channels, setChannels] = useState([]) // all channels
  const [joinedChannels, setJoinedChannels] = useState([]) // all channels joined by the user
  const [currentChannel, setCurrentChannel] = useState('default') // current selected channel

  const { currentCabal } = useCabal()

  const focusChannel = (channel: string) => {
    if (joinedChannels?.includes(channel) && channel !== currentChannel) {
      currentCabal.focusChannel(channel)
    }
  }

  useEffect(() => {
    if (!currentCabal) return
    const channelsList = currentCabal.getChannels()
    const joinedChannelsList = currentCabal.getJoinedChannels()
    const channel = currentCabal.getCurrentChannel()
    // const channelMembers = client.getChannelMembers(channel);

    // TODO: any way to batch irrespective of the renderer?
    setChannels(channelsList)
    setCurrentChannel(channel)
    setJoinedChannels(joinedChannelsList)
    // setMembers(channelMembers);

    if (channel === '!status') {
      currentCabal.focusChannel('default')
      setCurrentChannel('default')
    }

    if (currentCabal) {
      currentCabal.on('channel-focus', ({ channel }: { channel: string }) => {
        setCurrentChannel(channel)
      })
    }
  }, [currentCabal])

  return {
    channels,
    joinedChannels,
    currentChannel,
    focusChannel,
  }
}
