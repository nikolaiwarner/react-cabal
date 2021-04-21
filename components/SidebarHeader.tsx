import { DrawerActions, useTheme } from '@react-navigation/native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import styled from 'styled-components/native'

import { CabalProps } from '../app/types'
import { RootState } from '../app/rootReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Avatar from './Avatar'

const Container = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 61px;
  justify-content: space-between;
  padding-top: 0;
  width: 236px;
  padding-right: 8px;
`

const AvatarNameContainer = styled.TouchableOpacity`
  padding-left: 16px;
  display: flex;
  flex-direction: row;
`

const CabalName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  padding-left: 8px;
  padding-right: 8px;
`

const UserName = styled.Text`
  font-size: 14px;
  overflow: hidden;
  padding-left: 8px;
  padding-right: 8px;
`

export default function SidebarHeader(props) {
  const { colors } = useTheme()

  const { currentCabal } = useSelector((state: RootState) => state.cabals)

  return (
    <Container>
      <AvatarNameContainer>
        <Avatar name={currentCabal.name ?? currentCabal.key} />
        <View>
          <CabalName style={{ color: colors.text }}>
            {currentCabal.name ?? currentCabal.key}
          </CabalName>
          <UserName style={{ color: colors.textSofter }}>
            {/* {currentCabal.name ?? currentCabal.key} */}
            nickwarner
          </UserName>
        </View>
      </AvatarNameContainer>
      <TouchableOpacity>
        <Feather name="more-vertical" size={18} color={colors.textSofter} />
      </TouchableOpacity>
    </Container>
  )
}
