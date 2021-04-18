import { Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components/native'

import { MessageProps } from '../app/types'
import Avatar from './Avatar'

interface MessageComponentProps {
  message: MessageProps
  repeatedName: boolean
}

const MessageContainer = styled.View`
  display: flex;
  margin-bottom: 10px;
  padding-top: 4px;
  width: 100%;
`

const Timestamp = styled.Text`
  color: rgba(0, 0, 0, 0.33);
  /* font-size: 0.75rem; */
  font-weight: 500;
  margin-left: 8px;

  & .date--full {
    margin-left: 8px;
    opacity: 0;
    /* transition: opacity 0.2s ease-in-out; */
  }
`

const AvatarContainer = styled.View`
  display: flex;
  padding: 0 10px 0 16px;
`

const Content = styled.View`
  display: flex;
  flex-direction: column;
  /* font-size: 0.875rem; */
  line-height: 1.5;
  padding: 0 24px 0 0;

  &:hover .date .date--full {
    opacity: 1;
  }
`

const StyledText = styled.Text`
  margin-left: ${(props) => (props.indent ? '32px;' : '0px')};
  margin-top: ${(props) => (props.indent ? '-12px;' : '0px')};
`

const Name = styled.Text`
  align-items: flex-end;
  display: flex;
  font-weight: 700;
  margin-top: -5px;
`

export default function Message(props: MessageComponentProps) {
  const { colors } = useTheme()

  const renderDate = () => {
    const time = moment(props.message.time)
    return (
      <Timestamp>
        {time.format('h:mm A')}
        {/* <View className="date--full">{time.format('LL')}</View> */}
      </Timestamp>
    )
  }

  const enrichText = (content) => {
    // TODO
    return content
  }

  return (
    <MessageContainer>
      <AvatarContainer>
        {props.repeatedName ? null : (
          <Avatar name={props.message.user.name || 'conspirator'} />
        )}
      </AvatarContainer>
      <Content>
        {props.repeatedName ? null : (
          <Name style={{ color: colors.text }}>
            {props.message.user.name || 'conspirator'}
            {renderDate()}
          </Name>
        )}
        <StyledText style={{ color: colors.text }} indent={!!props.repeatedName}>
          {enrichText(props.message.content)}
        </StyledText>
      </Content>
    </MessageContainer>
  )
}
