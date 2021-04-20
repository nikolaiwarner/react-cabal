import { View } from 'react-native'
import Identicon from 'react-blockies'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

const AvatarContainer = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  /* .identicon {
    overflow: hidden;
    border-radius: 10rem;
  } */
`

const Name = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
`

export default function Avatar({ name, bgColor, onClick }) {
  return (
    <AvatarContainer>
      <Name>{name?.substr(0, 2)}</Name>
      {/* <Identicon seed={name} bgColor={bgColor || '#fff'} onClick={onClick} /> */}
    </AvatarContainer>
  )
}

Avatar.propTypes = {
  bgColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}
