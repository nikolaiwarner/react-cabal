import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'

const PeerListContainer = styled.View`
  padding-bottom: 32px;
`

const ListHeader = styled.Text`
  padding: 32px 16px 16px 16px;
  text-transform: uppercase;
`

const Row = styled.TouchableOpacity`
  /* cursor: pointer; */
  padding: 8px 16px;
`

const StarterMessage = styled.Text``

export default function PeerList() {
  const { colors } = useTheme()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  const onClickPeer = () => {}

  return (
    <PeerListContainer>
      <ListHeader style={{ color: colors.text }}>Peers</ListHeader>
      {!currentCabal.users.length && (
        <StarterMessage style={{ color: colors.text }}>No Peers.</StarterMessage>
      )}
      {currentCabal.users.length &&
        currentCabal.users.map((peer, index) => {
          const name = peer.name || peer.key.substr(0, 6)
          return (
            <Row key={index} onPress={onClickPeer}>
              <Text style={{ color: colors.text }}>{name}</Text>

              {/* {peer.online} */}
            </Row>
          )
        })}
    </PeerListContainer>
  )
}
