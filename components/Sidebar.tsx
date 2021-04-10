import { View } from 'react-native-web'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import ChannelList from './ChannelList'
import PeerList from './PeerList'

const SidebarContainer = styled.View`
  flex: 0 0 13.75rem;
  background-color: #16161d;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  padding-top: 2rem;
`

const CabalName = styled.View`
  padding: 1rem 1rem;
  /* overflow: hidden; */
`

export default function Sidebar({ cabal }) {
  return (
    <SidebarContainer>
      <CabalName>{cabal.key}</CabalName>
      <ChannelList
        cabalKey={cabal.key}
        channels={cabal.channels}
        channelsJoined={cabal.channelsJoined}
        currentChannel={cabal.currentChannel}
      />
      <PeerList users={cabal.users} />
    </SidebarContainer>
  )
}

Sidebar.propTypes = {
  cabal: PropTypes.object,
}
