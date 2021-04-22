import {
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
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

const MessageComposerContainer = styled.View`
  border-top-color: ${(props) => props.colors.border};
  border-top-width: 1px;
  padding: 8px 16px 8px 16px;
`

const InputWrapper = styled.View`
  align-items: center;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }
`

const Input = styled.View`
  align-content: center;
  display: flex;
  flex-direction: row;
  padding: 0 8px 0 0;
  width: 100%;
`

const Textarea = styled.TextInput`
  border: 0;
  flex-grow: 1;
  font-size: 16px;
  max-height: 200px;
  padding: 0 16px
    ${Platform.OS === 'web' &&
    `
    outlineWidth: 0;
    resize: none;
  `};
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

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit()
    } else if (event.key === 'Escape') {
      textInputRef.current.blur()
    } else if (event.key === 'ArrowUp') {
      console.log('UP')
    } else if (event.key === 'ArrowDown') {
      console.log('DOWN')
    }
  }

  const onSubmit = (_event?) => {
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
    <MessageComposerContainer colors={colors}>
      <InputWrapper style={{ borderColor: colors.border }}>
        <Input onClick={focusInput}>
          <Textarea
            aria-label="Type a message and press enter"
            onKeyPress={onKeyPress}
            placeholder="Write a message"
            ref={textInputRef}
            style={{ color: colors.text }}
          />
          <TouchableOpacity onPress={onSubmit}>
            <Ionicons name="send" size={18} color={colors.text} />
          </TouchableOpacity>
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
