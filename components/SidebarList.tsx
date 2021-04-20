import { DrawerActions, useTheme, useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, { ReactElement } from 'react'
import styled from 'styled-components/native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import { focusChannel } from '../features/cabals/cabalsSlice'
import { ChannelProps } from '../app/types'
import { RootState } from '../app/rootReducer'

const SidebarListContainer = styled.View`
  padding-bottom: 12px;
`

const ListHeader = styled.Text`
  border-color: ${(props) => props.colors.border};
  border-top-width: 1px;
  color: ${(props) => props.colors.textSofter};
  padding-bottom: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  text-transform: uppercase;
`

const ListBody = styled.View``

interface SidebarListProps {
  activeItem?: any
  isClosed?: boolean
  items?: any[]
  onClickRow?: (item: any) => void
  onToggleClosed?: () => void
  renderItem: (item: any, isActive?: boolean) => ReactElement
  title: string
}

export default function SidebarList(props: SidebarListProps) {
  const { colors } = useTheme()
  // const { currentCabal } = useSelector((state: RootState) => state.cabals)
  // const dispatch = useDispatch()
  // const navigation = useNavigation()

  const onClickRow = (item: any) => {
    // navigation.dispatch(DrawerActions.toggleDrawer())
    // dispatch(focusChannel({ cabalKey: currentCabal.key, channel }))

    props.onClickRow?.(item)
  }

  return (
    <SidebarListContainer>
      <ListHeader colors={colors}>{props.title}</ListHeader>
      {!props.isClosed && (
        <ListBody>
          {props.items?.length &&
            props.items?.map((item) => props.renderItem(item, item === props.activeItem))}
        </ListBody>
      )}
    </SidebarListContainer>
  )
}
