import Identicon from 'react-blockies'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;
  background-color: #000;
  border-radius: ${(props) => props.size ?? '32px'};
  display: flex;
  height: ${(props) => props.size ?? '32px'};
  justify-content: center;
  width: ${(props) => props.size ?? '32px'};
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
  size?: number
}

export default function Avatar(props: AvatarProps) {
  return (
    <Container size={props.size}>
      <Name>{props.name?.substr(0, 2)}</Name>
      {/* <Identicon seed={name} bgColor={bgColor || '#fff'} onClick={onClick} /> */}
    </Container>
  )
}
