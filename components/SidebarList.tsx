import { DrawerActions, useTheme, useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components/native'

const SidebarListContainer = styled.View`
  border-color: ${(props) => props.colors.border};
  border-top-width: 1px;
  padding-bottom: 12px;
`

const ListHeader = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-left: 16px;
  padding-top: 12px;
`

const Title = styled.Text`
  color: ${(props) => props.colors.textSofter};
  text-transform: uppercase;
`

const ListBody = styled.View``

interface SidebarListProps {
  activeItem?: any
  renderHeaderActionButton?: () => ReactElement
  isClosed?: boolean
  items?: any[]
  onClickRow?: (item: any) => void
  onToggleClosed?: () => void
  renderItem: (item: any, isActive?: boolean) => ReactElement
  title: string
}

export default function SidebarList(props: SidebarListProps) {
  const { colors } = useTheme()

  return (
    <SidebarListContainer colors={colors}>
      <ListHeader onPress={props.onToggleClosed}>
        <Title colors={colors}>
          <Octicons
            name={props.isClosed ? 'triangle-right' : 'triangle-down'}
            size={12}
            color={colors.textSofter}
          />
          {'  '}
          {props.title}
        </Title>
        {props.renderHeaderActionButton && props.renderHeaderActionButton()}
      </ListHeader>
      {!props.isClosed && (
        <ListBody>
          {props.items?.length &&
            props.items?.map((item) => props.renderItem(item, item === props.activeItem))}
        </ListBody>
      )}
    </SidebarListContainer>
  )
}
