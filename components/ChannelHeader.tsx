import { Image, View } from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import { RootState } from '../app/rootReducer'

const ChannelHeaderContainer = styled.View`
  -webkit-app-region: drag;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`

const Title = styled.View`
  align-items: center;
`

const ChannelName = styled.View`
  align-items: center;
  display: flex;
  font-size: 1.1rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`

const Topic = styled.View`
  font-size: 0.75rem;
  color: #666;
`

const Actions = styled.View`
  display: flex;
  text-align: right;
  vertical-align: middle;
`

const SettingsButton = styled.View`
  /* cursor: pointer; */
  display: inline-block;
  margin-left: 1rem;
  vertical-align: middle;
`

export default function ChannelHeader() {
  const dispatch = useDispatch()
  const cabals = useSelector((state: RootState) => state.cabals)

  function onClickTopic() {}

  function onClickSettings() {}

  return (
    <ChannelHeaderContainer>
      <Title>
        <ChannelName>#{cabals.currentChannel}</ChannelName>
        <Topic onClick={onClickTopic}>{cabals.currentTopic}</Topic>
      </Title>
      <Actions>
        <SettingsButton onClick={onClickSettings}>
          <Image src="static/images/icon-channelother.svg" />
        </SettingsButton>
      </Actions>
    </ChannelHeaderContainer>
  )
}

ChannelHeader.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string,
    topic: PropTypes.string,
  }),
  onClickSettings: PropTypes.func,
  onClickTopic: PropTypes.func,
}
