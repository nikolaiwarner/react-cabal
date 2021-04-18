import { Image, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import styled from 'styled-components/native'

import { CabalProps } from '../app/types'
import { focusCabal, showScreen } from '../features/cabals/cabalsSlice'
import { RootState } from '../app/rootReducer'

const CabalListContainer = styled.View`
  background-color: #16161d;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`

const List = styled.View`
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1;
  padding-right: 1;
  overflow: scroll;
`

const Item = styled.Text`
  align-items: center;
  border-radius: 100;
  border: 2px solid rgba(255, 255, 255, 0.75);
  color: rgba(255, 255, 255, 0.75);
  /* cursor: pointer; */
  display: flex;
  font-size: 0.75;
  font-weight: 700;
  height: 2;
  justify-content: center;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0.75;
  margin-left: 0;
  /* transition: all 0.05s ease-in-out; */
  width: 2;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &.active {
    background-color: #693afa;
    border: none;
    color: white !important;
  }
`

export default function CabalList() {
  const dispatch = useDispatch()

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  const onClickCabalListItem = (cabalKey) => {
    // dispatch(focusCabal({ cabalKey }))
  }

  const onClickAddCabalButton = () => {
    dispatch(showScreen('addCabal'))
  }

  const onClickAppSettingsButton = () => {
    dispatch(showScreen('settings'))
  }

  // if (loading) {
  //   return (
  //     <CabalListContainer>
  //       <Text>Loading...</Text>
  //     </CabalListContainer>
  //   )
  // }
  return (
    <CabalListContainer>
      <List>
        {cabals.length &&
          cabals.map((cabal, index) => {
            return (
              <Item key={index} onClick={() => onClickCabalListItem(cabal.key)}>
                {cabal.key.substr(0, 2)}
              </Item>
            )
          })}
        <Item onClick={onClickAddCabalButton}>
          {/* <Image src="static/images/icon-newchannel.svg" /> */}
        </Item>
      </List>
      <Item onClick={onClickAppSettingsButton}>
        {/* <Image src="static/images/icon-newchannel.svg" /> */}
      </Item>
    </CabalListContainer>
  )
}
