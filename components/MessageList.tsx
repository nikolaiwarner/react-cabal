import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { MessageProps } from '../app/types'
import Message from './Message'
import { useMessage } from '../lib'

interface SectionProps {
  title: string
}

export default function MessageList() {
  const { colors } = useTheme()

  const [sectionData, setSectionData] = useState([])
  const { messages } = useMessage()

  useEffect(() => {
    const dataByDate = {}
    for (const { value, sender } of messages) {
      const date = moment(value.timestamp).format('YYYY-MM-DD')
      if (!dataByDate[date]) dataByDate[date] = []
      dataByDate[date].push({
        content: value?.content?.text,
        key: sender,
        timestamp: value?.timestamp,
        user: { name: sender, key: sender, online: true },
      })
    }

    const data = Object.entries(dataByDate).map(([title, data]) => ({
      title,
      data: data?.reverse(),
    }))

    setSectionData(data)
  }, [messages])

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

  // if its an empty channel with no messages, show a placeholder
  if (messages.length === 0) {
    return (
      <StarterMessage>
        {/* This is a new channel. Send a message to start things off */}
      </StarterMessage>
    )
  }

  return (
    <MessageSectionList
      inverted
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sectionData}
    />
  )
}

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
