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

  const joinChannel = (channel: string) => {
    if (!joinedChannels?.includes(channel)) {
      currentCabal.joinChannel(channel)
    }
  }

  useEffect(() => {
    if (!currentCabal) return

    const channel = currentCabal.getCurrentChannel()

    setChannels(currentCabal.channels)
    setCurrentChannel(channel)
    setJoinedChannels(currentCabal.getJoinedChannels())
    // setMembers(channelMembers);

    if (channel === '!status') {
      currentCabal.focusChannel('default')
      setCurrentChannel('default')
    }

    if (currentCabal) {
      currentCabal.on('channel-focus', ({ channel }: { channel: string }) => {
        setCurrentChannel(channel)
      })

      currentCabal.on('channel-join', (channel) => {
        // TODO: actions any if on joining channels
      })
    }
  }, [currentCabal])

  return {
    channels,
    joinedChannels,
    currentChannel,
    focusChannel,
    joinChannel,
  }
}
