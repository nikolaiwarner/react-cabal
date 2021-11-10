import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { generateUniqueName } from '../utils/helpers'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../features/cabals/messagesSlice'

interface UseCabalProps {}

//@ts-ignore
const cabalClient = Platform.OS === 'web' ? new window.CabalClient() : undefined

export default function useCabal(props?: UseCabalProps) {
  const dispatch = useDispatch()

  const initializeCabal = ({ key, nickname }: { key: string; nickname?: string }) => {
    nickname = nickname ?? generateUniqueName()

    if (!cabalClient) {
      console.error('cabal client is not available')
      return
    }

    console.log({ cabalClient })

    cabalClient.addCabal(key).then((cabalDetails) => {
      // cabalDetails.getLocalKey((err, localkey) => {
      //   console.log('local key:', localkey)
      // })

      cabalDetails.on('new-message', ({ channel, author, message }) => {
        console.log('Got a message: ', author, channel, message)

        dispatch(
          addMessage({
            channel,
            content: message.value.content.text,
            key: message.key,
            timestamp: message.value.timestamp,
            user: {
              key: author.key,
              local: author.local,
              name: author.name,
              online: author.online,
            },
          }),
        )
      })

      cabalDetails.on('update', (payload) => {
        console.log('Recieved: ', payload)
      })

      cabalDetails.on('peer-added', (k) => {
        console.log('new peer', k)
        cabalDetails.publishMessage({
          type: 'chat/text',
          content: {
            text: 'peer-added: ' + k.key,
            channel: 'default',
          },
        })
      })

      cabalDetails.publishNick(nickname, () => {
        cabalDetails.publishMessage({
          type: 'chat/text',
          content: {
            text: 'Hey there! Im ' + nickname,
            channel: 'default',
          },
        })
      })
    })
  }

  return { cabalClient, initializeCabal }
}
