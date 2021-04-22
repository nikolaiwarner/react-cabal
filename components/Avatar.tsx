import Identicon from 'react-blockies'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 32px;
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

interface AvatarProps {
  bgColor?: string
  name?: string
  onClick?: () => void
}

export default function Avatar(props: AvatarProps) {
  return (
    <Container>
      <Name>{props.name?.substr(0, 2)}</Name>
      {/* <Identicon seed={name} bgColor={bgColor || '#fff'} onClick={onClick} /> */}
    </Container>
  )
}
