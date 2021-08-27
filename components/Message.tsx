import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'
import moment from 'moment'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { MessageProps } from '../app/types'
import { setSelectedUser } from '../features/cabals/cabalsSlice'
import Avatar from './Avatar'

interface MessageComponentProps {
  message: MessageProps
  repeatedName: boolean
}

const MessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  padding-top: 4px;
  /* width: 100%; */
`

const AvatarContainer = styled.TouchableOpacity`
  display: flex;
  padding-right: 16px;
`

const Name = styled.Text`
  align-items: flex-end;
  color: ${({ colors }) => colors.text};
  display: flex;
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  margin-top: -5px;
`

const Timestamp = styled.Text`
  color: ${({ colors }) => colors.textSofter};
  font-size: 12px;
  font-weight: 400;

  & .date--full {
    margin-left: 8px;
    opacity: 0;
    /* transition: opacity 0.2s ease-in-out; */
  }
`

const Content = styled.View`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 0 24px 0 0;

  &:hover .date .date--full {
    opacity: 1;
  }
`

const StyledText = styled.Text`
  color: ${({ colors }) => colors.textSofter};
  font-size: 16px;
  margin-left: ${(props) => (props.indent ? '32px;' : '0px')};
  margin-right: 16px;
  margin-top: ${(props) => (props.indent ? '-12px;' : '0px')};
  /* max-width: 800px; */
`

export default function Message(props: MessageComponentProps) {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const renderDate = () => {
    const time = moment(props.message.timestamp)
    return (
      <Timestamp colors={colors} style={{ color: colors.textSofter }}>
        ⋅ {time.format('h:mm A')}
        {/* <View className="date--full">{time.format('LL')}</View> */}
      </Timestamp>
    )
  }

  const enrichText = (content) => {
    // TODO
    return content
  }

  const onPressUser = useCallback(() => {
    dispatch(setSelectedUser(props.message.user))
    navigation.navigate('UserProfileScreen')
  }, [])

  return (
    <MessageContainer>
      <AvatarContainer onPress={onPressUser}>
        {props.repeatedName ? null : (
          <Avatar name={props.message?.user?.name || 'conspirator'} />
        )}
      </AvatarContainer>
      <Content>
        {props.repeatedName ? null : (
          <TouchableOpacity onPress={onPressUser}>
            <Name colors={colors}>
              {props.message?.user?.name || 'conspirator'} {renderDate()}
            </Name>
          </TouchableOpacity>
        )}
        <StyledText colors={colors} indent={!!props.repeatedName}>
          {enrichText(props.message.content)}
        </StyledText>
      </Content>
    </MessageContainer>
  )
}
