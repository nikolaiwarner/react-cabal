import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { focusChannel } from '../features/cabals/cabalsSlice'
import { ChannelProps } from '../app/types'
import { RootState } from '../app/rootReducer'

const ChannelListContainer = styled.View``

const ListHeader = styled.Text`
  text-transform: uppercase;
  padding-top: 32px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
`

const Row = styled.TouchableOpacity`
  /* cursor: pointer; */
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;

  &:hover {
    background-color: #444;
  }
`

const StarterMessage = styled.Text``

export default function ChannelList() {
  const { colors } = useTheme()
  const { currentCabal } = useSelector((state: RootState) => state.cabals)
  const dispatch = useDispatch()

  const onClickRow = (channel) => {
    dispatch(focusChannel({ cabalKey: currentCabal.key, channel }))
  }

  return (
    <ChannelListContainer>
      <ListHeader style={{ color: colors.text }}>Channels</ListHeader>
      {!currentCabal.channelsJoined.length && (
        <StarterMessage style={{ color: colors.text }}>No channels</StarterMessage>
      )}
      {currentCabal.channelsJoined.length &&
        currentCabal.channelsJoined.map((channel, index) => {
          return (
            <Row key={index} onPress={() => onClickRow(channel)}>
              <Text style={{ color: colors.text }}>#{channel.name}</Text>
            </Row>
          )
        })}
    </ChannelListContainer>
  )
}
