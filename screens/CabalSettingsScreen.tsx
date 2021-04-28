import { TextInput, Text, View, SafeAreaView, ScrollView, Switch } from 'react-native'
import { NavigationContainer, DrawerActions, useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useContext } from 'react'

import { LocalizationContext } from '../utils/Translations'
import { RootState } from '../app/rootReducer'
import Button from '../components/Button'
import HelpText from '../components/HelpText'
import PanelHeader from '../components/PanelHeader'
import PanelSection from '../components/PanelSection'
import SectionHeaderText from '../components/SectionHeaderText'

function CabalSettingsScreen({ navigation }) {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)

  const { cabals, currentCabal } = useSelector((state: RootState) => state.cabals)

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onPressCopyCabalKey = useCallback(() => {}, [currentCabal.key])

  const onPressEditTheme = useCallback(() => {
    navigation.navigate('ThemeEditorScreen')
  }, [])

  const onPressRemoveCabal = useCallback(() => {}, [])

  const shareableCabalKey = useCallback(() => {
    // TODO
    const adminParams = ''
    const modParams = ''
    return `cabal://${currentCabal.key}?${adminParams}&${modParams}`
  }, [currentCabal.key])

  return (
    <SafeAreaView>
      <PanelHeader onPressClose={onPressClose} title={t('cabal_settings_title')} />
      <ScrollView>
        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('cabal_settings_invite_header')}
          </SectionHeaderText>
          <HelpText colors={colors}>{t('cabal_settings_invite_body')}</HelpText>
          <TextInput value={shareableCabalKey()} />
          <Button
            onPress={onPressCopyCabalKey}
            title={t('cabal_settings_copy_key_button')}
          />
        </PanelSection>

        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('cabal_settings_cabal_name_header')}
          </SectionHeaderText>
          <HelpText colors={colors}>{t('cabal_settings_cabal_name_body')}</HelpText>
          <TextInput value={currentCabal.name} />
        </PanelSection>

        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('cabal_settings_notifications_header')}
          </SectionHeaderText>
          <HelpText colors={colors}>{t('cabal_settings_notifications_body')}</HelpText>
          <Switch />
        </PanelSection>

        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('cabal_settings_edit_theme_header')}
          </SectionHeaderText>
          <Button
            onPress={onPressEditTheme}
            title={t('cabal_settings_edit_theme_button')}
          ></Button>
        </PanelSection>

        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors} style={{ paddingBottom: 16 }}>
            {t('cabal_settings_remove_cabal_header')}
          </SectionHeaderText>
          <HelpText colors={colors}>{t('cabal_settings_remove_cabal_body')}</HelpText>
          <Button
            onPress={onPressRemoveCabal}
            title={t('cabal_settings_remove_cabal_button', {
              key: currentCabal.key.substr(0, 8),
            })}
          ></Button>
        </PanelSection>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CabalSettingsScreen
