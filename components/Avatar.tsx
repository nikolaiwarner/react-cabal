import { View } from 'react-native-web'
import Identicon from 'react-blockies'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

const AvatarContainer = styled.View`
  .identicon {
    overflow: hidden;
    border-radius: 10rem;
  }
`

export default function Avatar({ name, bgColor, onClick }) {
  return (
    <AvatarContainer>
      <Identicon seed={name} bgColor={bgColor || '#fff'} onClick={onClick} />
    </AvatarContainer>
  )
}

Avatar.propTypes = {
  bgColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}
