import { useState, useEffect, useRef } from 'react'
import { useCabal } from './useCabal'
import { useUsers } from './useUsers'

export function useChannel() {
  const [channels, setChannels] = useState([]) // all channels
  const [joinedChannels, setJoinedChannels] = useState([]) // all channels joined by the user
  const [currentChannel, setCurrentChannel] = useState('default') // current selected channel
  const [currentChannelMembers, setCurrentChannelMembers] = useState([]) // members of the current channel
  const { users } = useUsers()

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

  // set topic for current channel
  const setCurrentChannelTopic = (topic: string) => {
    currentCabal.setChannelTopic(currentChannel, topic)
  }

  useEffect(() => {
    // update member list!
    const memberSet = channels?.[currentChannel]?.members?.values()
    if (memberSet) {
      const memberList = Array.from(memberSet)
        .map((member) => users?.[member])
        .filter((i) => !!i)
      setCurrentChannelMembers(memberList)
    }
  }, [users, currentChannel])

  useEffect(() => {
    if (!currentCabal) return

    const channel = currentCabal.getCurrentChannel()

    setChannels(currentCabal.channels)
    setCurrentChannel(channel)
    setJoinedChannels(currentCabal.getJoinedChannels())
    // setMembers(channelMembers);

    if (currentCabal) {
      currentCabal.on('channel-focus', ({ channel }: { channel: string }) => {
        setCurrentChannel(channel)
      })

      currentCabal.on('channel-join', (channel) => {
        // TODO: actions any if on joining channels
      })

      if (channel === '!status') {
        focusChannel('default')
      }
    }
  }, [currentCabal])

  return {
    channels,
    joinedChannels,
    currentChannel,
    focusChannel,
    joinChannel,
    currentChannelMembers,
    setCurrentChannelTopic,
  }
}
