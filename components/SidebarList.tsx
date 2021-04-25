import { DrawerActions, useTheme, useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components/native'
import { updateSidebarList } from '../features/cabals/cabalsSlice'
import { SidebarListProps, SidebarListsProps } from '../app/types'

const SidebarListContainer = styled.View`
  border-color: ${(props) => props.colors.border};
  border-top-width: 1px;
  padding-bottom: 12px;
`

const ListHeader = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-left: 16px;
  padding-top: 12px;
`

const TitleContainer = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.Text`
  color: ${(props) => props.colors.textSofter};
  text-transform: uppercase;
`

const ListBody = styled.View``

interface SidebarListComponentProps {
  activeItem?: any
  items?: any[]
  onClickRow?: (item: any) => void
  onToggleClosed?: () => void
  renderHeaderActionButton?: () => ReactElement
  renderItem: (item: any, isActive?: boolean) => ReactElement
  sidebarList: SidebarListProps
  title: string
}

export default function SidebarList(props: SidebarListComponentProps) {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const onPressToggleSidebarList = () => {
    dispatch(
      updateSidebarList({
        ...props.sidebarList,
        open: !props.sidebarList.open,
      }),
    )
  }

  return (
    <SidebarListContainer colors={colors}>
      <ListHeader>
        <TitleContainer onPress={onPressToggleSidebarList}>
          <Title colors={colors}>
            <Octicons
              name={props.sidebarList.open ? 'triangle-down' : 'triangle-right'}
              size={12}
              color={colors.textSofter}
            />
            {'  '}
            {props.title}
          </Title>
        </TitleContainer>
        {props.renderHeaderActionButton && props.renderHeaderActionButton()}
      </ListHeader>
      {props.sidebarList.open && (
        <ListBody>
          {props.items?.length &&
            props.items?.map((item) => props.renderItem(item, item === props.activeItem))}
        </ListBody>
      )}
    </SidebarListContainer>
  )
}
