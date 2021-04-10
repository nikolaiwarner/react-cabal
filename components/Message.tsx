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
  margin-bottom: 0.6rem;
  padding-top: 0.3rem;
  width: 100%;

  .date {
    color: rgba(0, 0, 0, 0.33);
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 0.5rem;

    & .date--full {
      margin-left: 0.5rem;
      opacity: 0;
      /* transition: opacity 0.2s ease-in-out; */
    }
  }
`

const AvatarContainer = styled.View`
  display: flex;
  padding: 0 0.7rem 0 1rem;
`

const Content = styled.View`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0 1.5rem 0 0;

  &:hover .date .date--full {
    opacity: 1;
  }
`

const Text = styled.View`
  margin-left: ${(props) => (props.indent ? '32px;' : 'inherit')};
  margin-top: ${(props) => (props.indent ? '-12px;' : 'inherit')};
`

const Name = styled.View`
  align-items: flex-end;
  display: flex;
  font-weight: 700;
  margin-top: -5px;
`

export default function Message(props: MessageComponentProps) {
  const renderDate = () => {
    const time = moment(props.message.time)
    return (
      <span className="date">
        {time.format('h:mm A')}
        <span className="date--full">{time.format('LL')}</span>
      </span>
    )
  }

  const enrichText = (content) => {
    // TODO
    return content.text
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
          <Name>
            {props.message.user.name || 'conspirator'}
            {renderDate()}
          </Name>
        )}
        <Text indent={!!props.repeatedName}>{enrichText(props.message.content)}</Text>
      </Content>
    </MessageContainer>
  )
}
