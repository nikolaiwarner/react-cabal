import { useContext, useState, useEffect } from 'react';
import { useCabal } from './useCabal';
import { CabalContext } from '../CabalProvider';

export function useChannel() {
  const client = useContext(CabalContext);

  const [channels, setChannels] = useState([]); // all channels
  const [joinedChannels, setJoinedChannels] = useState([]); // all channels joined by the user
  const [currentChannel, setCurrentChannel] = useState('default'); // current selected channel
  const [members, setMembers] = useState([]); // members of channel

  const { currentCabal } = useCabal();

  function focusChannel(channel: string) {
    if (
      client?.getJoinedChannels().includes(channel) &&
      channel !== currentChannel
    )
      client.focusChannel(channel);
  }
  useEffect(() => {
    if (!client) return;
    const channelsList = client.getChannels();
    const joinedChannelsList = client.getJoinedChannels();
    const channel = client.getCurrentChannel();
    // const channelMembers = client.getChannelMembers(channel);

    // TODO: any way to batch irrespective of the renderer?
    setChannels(channelsList);
    setCurrentChannel(channel);
    setJoinedChannels(joinedChannelsList);
    // setMembers(channelMembers);

    if (channel === '!status') {
      client.focusChannel('default');
      setCurrentChannel('default');
    }
  }, [currentCabal, client]);

  useEffect(() => {
    if (currentCabal)
      currentCabal.on('channel-focus', (event: any) => {
        setCurrentChannel(event.channel);
      });
  }, [client, currentCabal]);

  return {
    channels,
    joinedChannels,
    currentChannel,
    focusChannel, // change the current channel
    members,
  };
}
