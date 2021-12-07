import { useContext, useState, useEffect, useRef } from 'react'
import { useCabal } from './useCabal'
import { CabalContext } from '../CabalProvider'

let cli

export function useChannel() {
  const client = useContext(CabalContext)
  cli = useContext(CabalContext)
  const [channels, setChannels] = useState([]) // all channels
  const [joinedChannels, setJoinedChannels] = useState([]) // all channels joined by the user
  const [currentChannel, setCurrentChannel] = useState('default') // current selected channel
  const [members, setMembers] = useState([]) // members of channel

  const { currentCabal } = useCabal()

  function focusChannel(channel: string) {
    window.client = client
    if (client?.getJoinedChannels()?.includes(channel) && channel !== currentChannel) {
      console.log('and this is calleddddd to chnage channelasdf')
      client.focusChannel(channel)
      setCurrentChannel(channel)
    }
  }

  useEffect(() => {
    if (!client) return
    const channelsList = client.getChannels()
    const joinedChannelsList = client.getJoinedChannels()
    const channel = client.getCurrentChannel()
    // const channelMembers = client.getChannelMembers(channel);

    // TODO: any way to batch irrespective of the renderer?
    setChannels(channelsList)
    setCurrentChannel(channel)
    setJoinedChannels(joinedChannelsList)
    // setMembers(channelMembers);

    if (channel === '!status') {
      client.focusChannel('default')
      setCurrentChannel('default')
    }
  }, [currentCabal, client])

  function switchChannel(channel) {
    console.log('channel is changed to', channel)
  }

  useEffect(() => {
    if (!client) return
    const cabal = client?.getCurrentCabal()
    cabal.on('channel-focus', switchChannel)

    return
  }, [currentCabal, client])

  useEffect(() => {
    if (currentCabal)
      currentCabal.on('channel-focus', (event: any) => {
        setCurrentChannel(event.channel)
      })
  }, [client, currentCabal])

  console.log('client value is', client)
  return {
    channels,
    joinedChannels,
    currentChannel,
    focusChannel, // change the current channel
    members,
  }
}
