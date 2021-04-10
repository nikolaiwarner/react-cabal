import { useSelector, useDispatch } from 'react-redux'
import { Image, TextInput, View } from 'react-native-web'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled from 'styled-components/native'

// import '../../node_modules/emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

import { publishMessage } from '../features/cabals/messagesSlice'
import { RootState } from '../app/rootReducer'
import { setEmojiPickerModalVisible } from '../features/cabals/cabalsSlice'

const MessageComposerContainer = styled.View`
  background: #fff;
  /* cursor: text; */
  margin: 0 1rem 1rem 1rem;
`

const InputWrapper = styled.View`
  align-items: center;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  min-height: 48px;
  padding: 0.5rem 0;
  /* transition: all 0.1s ease-in-out; */

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }
`

const Input = styled.View`
  padding: 0 1rem;
  width: 100%;
`

const Form = styled.View`
  align-content: center;
  display: flex;
  width: 100%;
`

const Textarea = styled.TextInput`
  border: 0;
  display: block;
  font-size: 0.875rem;
  max-height: 200px;
  outline: none;
  resize: none;
  width: 100%;
`

const EmojiPickerContainer = styled.View`
  position: 'absolute';
  bottom: '100px';
  right: '16px';
  display: 'none';
`

const ToggleEmojiPickerButton = styled.View``

export default function MessageComposer() {
  const dispatch = useDispatch()
  const cabals = useSelector((state: RootState) => state.cabals)

  const formFieldRef = useRef(null)
  const textInputRef = useRef(null)

  const onKeyDown = () => {}

  const onKeyUp = () => {
    // resizeTextInput
  }

  const onSubmit = (e) => {
    const message = {
      content: {
        channel: cabals.currentChannel,
        text: textInputRef.current.value,
      },
      type: 'chat/text',
    }
    dispatch(
      publishMessage({
        cabalKey: cabals.currentCabalKey,
        channel: cabals.currentChannel,
        message,
      }),
    )
  }

  const addEmoji = () => {}

  const focusInput = () => {}

  const toggleEmojis = () => {
    dispatch(setEmojiPickerModalVisible(!cabals.emojiPickerModalVisible))
  }

  return (
    <MessageComposerContainer>
      <InputWrapper>
        <Input onClick={focusInput}>
          <Form onSubmit={onSubmit} ref={formFieldRef}>
            <Textarea
              aria-label="Type a message and press enter"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              placeholder="Write a message"
              ref={textInputRef}
            />
            <button onClick={onSubmit}>Send</button>
          </Form>
        </Input>
        <EmojiPickerContainer visible={cabals.emojiPickerModalVisible}>
          {/* <Picker
            onSelect={(e) => addEmoji(e)}
            native
            sheetSize={64}
            // showPreview={false}
            autoFocus
            emoji='point_up'
            title='Pick an emoji...'
          /> */}
        </EmojiPickerContainer>
        <ToggleEmojiPickerButton onClick={toggleEmojis}>
          <Image src="static/images/icon-composerother.svg" />
        </ToggleEmojiPickerButton>
      </InputWrapper>
    </MessageComposerContainer>
  )
}

MessageComposer.propTypes = {
  channelName: PropTypes.string,
}
