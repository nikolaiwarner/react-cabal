import { Button, Image, Platform, Text, TextInput, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import React, { useRef } from 'react'
import styled from 'styled-components/native'

// import '../../node_modules/emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

import { publishMessage } from '../features/cabals/messagesSlice'
import { RootState } from '../app/rootReducer'
import { setEmojiPickerModalVisible } from '../features/cabals/cabalsSlice'
import { ChannelProps } from '../app/types'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MessageComposerContainer = styled.View`
  /* background: #fff; */
  /* cursor: text; */
  margin: 0 16px 16px 16px;
  height: 55px;
`

const InputWrapper = styled.View`
  align-items: center;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  min-height: 48px;
  padding: 8px 0;
  /* transition: all 0.1s ease-in-out; */

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }
`

const Input = styled.View`
  padding: 0 16px;
  width: 100%;
`

const Form = styled.View`
  align-content: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`

const Textarea = styled.TextInput`
  border: 0;
  font-size: 16px;
  max-height: 200px;
  width: 100%;

  ${Platform.OS === 'web' &&
  `
    outlineWidth: 0;
    resize: none;
  `}
`

const EmojiPickerContainer = styled.View`
  /* position: 'absolute';
  bottom: '100px';
  right: '16px';
  display: 'none'; */
`

const ToggleEmojiPickerButton = styled.View``

export default function MessageComposer() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  const formFieldRef = useRef(null)
  const textInputRef = useRef(null)

  const onKeyDown = () => {}

  const onKeyUp = () => {
    // resizeTextInput
  }

  const onSubmit = (e) => {
    // const message = {
    //   content: {
    //     channel: currentCabal.currentChannel,
    //     text: textInputRef.current.value,
    //   },
    //   type: 'chat/text',
    // }
    dispatch(
      publishMessage({
        cabalKey: currentCabal.key,
        channel: currentCabal.currentChannel.name,
        message: textInputRef.current.value,
      }),
    )
  }

  const addEmoji = () => {}

  const focusInput = () => {}

  const toggleEmojis = () => {
    // dispatch(setEmojiPickerModalVisible(!cabals.emojiPickerModalVisible))
  }

  return (
    <MessageComposerContainer>
      <InputWrapper style={{ borderColor: colors.border }}>
        <Input onClick={focusInput}>
          <Form onSubmit={onSubmit} ref={formFieldRef}>
            <Textarea
              aria-label="Type a message and press enter"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              placeholder="Write a message"
              ref={textInputRef}
              style={{ color: colors.text }}
            />
            <TouchableOpacity
              onPress={onSubmit}
              style={{ borderWidth: 1, borderColor: '#000', width: 100 }}
            >
              <Text style={{ color: colors.primary }}>Send</Text>
            </TouchableOpacity>
          </Form>
        </Input>
        {/* <EmojiPickerContainer visible={cabals.emojiPickerModalVisible}> */}
        {/* <Picker
            onSelect={(e) => addEmoji(e)}
            native
            sheetSize={64}
            // showPreview={false}
            autoFocus
            emoji='point_up'
            title='Pick an emoji...'
          /> */}
        {/* </EmojiPickerContainer> */}
        <ToggleEmojiPickerButton onClick={toggleEmojis}>
          {/* <Image src="static/images/icon-composerother.svg" /> */}
        </ToggleEmojiPickerButton>
      </InputWrapper>
    </MessageComposerContainer>
  )
}
