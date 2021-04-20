import { Feather } from '@expo/vector-icons'
import { Image, TouchableOpacity, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { CabalProps } from '../app/types'
import { focusCabal, showScreen } from '../features/cabals/cabalsSlice'
import { RootState } from '../app/rootReducer'
import { color } from 'react-native-reanimated'

const CabalListContainer = styled.View`
  /* flex-grow: 1; */
  /* width: 32px; */
  border-right-width: 1px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const List = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  overflow: scroll;
`

const Item = styled.TouchableOpacity`
  /* cursor: pointer; */
  /* transition: all 0.05s ease-in-out; */
  align-items: center;
  border-radius: 48px;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  opacity: 0.7;
  width: 48px;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &.active {
    border: none;
  }
`

const ItemText = styled.Text`
  font-weight: 700;
`

export default function CabalList() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  const onClickCabalListItem = (cabalKey) => {
    dispatch(focusCabal({ cabalKey }))
  }

  const onClickAddCabalButton = () => {
    dispatch(showScreen('addCabal'))
  }

  const onClickAppSettingsButton = () => {
    dispatch(showScreen('settings'))
  }

  return (
    <CabalListContainer style={{ borderRightColor: colors.border }}>
      <List>
        {cabals.length &&
          cabals.map((cabal, index) => {
            const isCurrent = cabal.key === currentCabal.key
            return (
              <Item
                key={index}
                onClick={() => onClickCabalListItem(cabal.key)}
                style={{
                  backgroundColor: colors.card,
                }}
              >
                <ItemText style={{ color: isCurrent ? colors.primary : colors.text }}>
                  {cabal.key.substr(0, 2)}
                </ItemText>
              </Item>
            )
          })}
        <Item onClick={onClickAddCabalButton}>
          <Feather name="plus" size={24} color={colors.textSofter} />
        </Item>
      </List>
      {/* <Item onClick={onClickAppSettingsButton}>
        <Feather name="settings" size={24} color={colors.text} />
      </Item> */}
    </CabalListContainer>
  )
}
