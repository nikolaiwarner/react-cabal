import { SectionList, Text, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'

import { MessageProps } from '../app/types'
import { RootState } from '../app/rootReducer'
import Message from './Message'
import { useMessage } from '../lib'

const MessageSectionList = styled.SectionList`
  overflow: scroll;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`

const SectionHeader = styled.View`
  align-items: center;

  border-top-color: ${({ colors }) => colors.border};
  border-top-width: 1px;
  margin-top: 8px;
  padding-bottom: 8px;
`

const SectionHeaderTextContainer = styled.View`
  background-color: ${({ colors }) => colors.background};
  border-radius: 8px;
  margin-top: -14px;
  padding-bottom: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
`

const SectionHeaderText = styled.Text`
  color: ${({ colors }) => colors.textSofter};
  font-size: 16px;
`

const StarterMessage = styled.View`
  flex-grow: 1;
  margin: 1rem;
  overflow: scroll;
`

interface SectionProps {
  title: string
}

export default function MessageList() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { messages } = useSelector((state: RootState) => state.messages)

  const [sectionData, setSectionData] = useState([])

  const { messages: messageList } = useMessage('default')

  useEffect(() => {
    buildSectionData()
  }, [messageList])

  // TODO: optimize this :(
  const buildSectionData = () => {
    const dataByDate = {}
    messageList.forEach(({ value, sender }) => {
      const date = moment(value.timestamp).format('YYYY-MM-DD')
      if (dataByDate[date]) {
        dataByDate[date].push({
          content: value?.content?.text,
          key: sender,
          timestamp: value?.timestamp,
          user: { name: sender, key: sender, online: true },
        })
      } else {
        dataByDate[date] = [
          {
            content: value?.content?.text,
            key: sender,
            user: { name: sender, key: sender, online: true },
          },
        ]
      }
    })
    const data = Object.entries(dataByDate).map(([title, data]) => ({
      title,
      data: data?.reverse(),
    }))

    setSectionData(data)
  }

  const keyExtractor = useCallback((item, index) => {
    // return item.key ?? index
    return index
  }, [])

  const renderItem = useCallback(({ item }: { item: MessageProps }) => {
    // TODO: fix styling of consecutive messages by the same author
    const repeatedName = false // message.user.key === lastMessageUserKey
    // lastMessageUserKey = message.user.key
    return <Message message={item} repeatedName={repeatedName} />
  }, [])

  const renderSectionHeader = useCallback(({ section }: { section: SectionProps }) => {
    return (
      <SectionHeader colors={colors}>
        <SectionHeaderTextContainer colors={colors}>
          <SectionHeaderText colors={colors}>
            {moment(section.title).format('LL')}
          </SectionHeaderText>
        </SectionHeaderTextContainer>
      </SectionHeader>
    )
  }, [])

  if (messages.length === 0) {
    return (
      <StarterMessage>
        {/* This is a new channel. Send a message to start things off */}
      </StarterMessage>
    )
  } else {
    let lastMessageUserKey = null

    return (
      <MessageSectionList
        inverted
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={sectionData}
      />
    )
  }
}
