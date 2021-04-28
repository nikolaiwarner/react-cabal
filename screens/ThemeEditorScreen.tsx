import { Picker } from '@react-native-community/picker'
import { SafeAreaView, ScrollView } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import hexColorRegex from 'hex-color-regex'
import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components/native'

import { DEFAULT_THEMES, setTheme } from '../features/themes/themesSlice'
import { LocalizationContext } from '../utils/Translations'
import { RootState } from '../app/rootReducer'
import PanelHeader from '../components/PanelHeader'
import PanelSection from '../components/PanelSection'
import SectionHeaderText from '../components/SectionHeaderText'
import Input from '../components/Input'

const Row = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Name = styled.Text``

function ChannelDetailScreen() {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { currentTheme } = useSelector((state: RootState) => state.themes)

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onChangeCustomColorValue = useCallback(
    ({ key, value }) => {
      if (hexColorRegex().test(value)) {
        dispatch(
          setTheme({
            ...currentTheme,
            name: 'Custom',
            colors: {
              ...currentTheme.colors,
              [key]: value,
            },
          }),
        )
      }
    },
    [currentTheme],
  )

  const keys = Object.keys(currentTheme.colors)

  const defaultCustomTheme = {
    ...currentTheme,
    name: 'Custom',
  }

  return (
    <SafeAreaView>
      <PanelHeader title={t('theme_editor_screen_title')} onPressClose={onPressClose} />
      <ScrollView>
        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors}>Pick a Theme</SectionHeaderText>
          <Picker
            selectedValue={currentTheme.name}
            onValueChange={(value, index) => {
              const newTheme = DEFAULT_THEMES[index]
              if (newTheme) {
                dispatch(setTheme(newTheme))
              } else {
                dispatch(setTheme(defaultCustomTheme))
              }
            }}
          >
            {[...DEFAULT_THEMES, defaultCustomTheme].map((theme, index) => {
              return <Picker.Item key={index} label={theme.name} value={theme.name} />
            })}
          </Picker>
        </PanelSection>

        {currentTheme.name === 'Custom' && (
          <PanelSection colors={colors}>
            <SectionHeaderText colors={colors}>Custom Theme</SectionHeaderText>
            {keys.map((key) => {
              return (
                <Row key={key}>
                  <Name>{key}</Name>
                  <Input
                    containerStyle={{ width: '50%' }}
                    defaultValue={currentTheme.colors[key]}
                    onChangeText={(value) => onChangeCustomColorValue({ key, value })}
                  />
                </Row>
              )
            })}
          </PanelSection>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChannelDetailScreen
