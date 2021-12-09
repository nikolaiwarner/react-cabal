import { useContext, useState, useEffect } from 'react'
import { CabalContext } from '../CabalProvider'
import { useCabal } from './useCabal'
import { useChannel } from './useChannel'
import { useUsers } from './useUsers'

export function useMessage() {
  const [messages, setMessages] = useState<Array<any>>([])
  const client = useContext(CabalContext)
  const { currentChannel } = useChannel()
  const { currentCabal } = useCabal()

  const { users } = useUsers()

  const messageHandler = (msg: any) => {
    const { message, channel: messageChannel } = msg

    if (messageChannel === currentChannel) {
      const currentMessage = {
        ...msg.message,
        sender: users?.[message.key]?.name || message?.key?.slice(0, 5),
      }

      setMessages((messages) => [...messages, currentMessage])
    }
  }
  useEffect(() => {
    if (!client) return
    client.getMessages(
      {
        currentChannel,
      },
      (allMessages: Array<any>) => {
        const messageList = allMessages.map((msg: any) => {
          return {
            ...msg,
            sender: users?.[msg.key]?.name || msg.key.slice(0, 5),
          }
        })
        setMessages(messageList)
      },
    )
    const cabal = client.getCurrentCabal()

    cabal.on('new-message', messageHandler)
    return () => cabal.removeListener('new-message', messageHandler)
  }, [currentChannel, currentCabal, client, users])

  function sendMessage(message) {
    currentCabal.publishMessage({
      type: 'chat/text',
      content: {
        text: message,
        channel: currentChannel,
      },
    })
  }

  return {
    messages,
    sendMessage,
  }
}
