import { SafeAreaView, ScrollView, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import React, { useCallback, useContext, useState } from 'react'

import { LocalizationContext } from '../utils/Translations'
import { RootState } from '../app/rootReducer'
import Button from '../components/Button'
import Input from '../components/Input'
import PanelHeader from '../components/PanelHeader'
import PanelSection from '../components/PanelSection'
import SectionHeaderText from '../components/SectionHeaderText'

function AddCabalScreen({ navigation }) {
  const { colors } = useTheme()
  const { t } = useContext(LocalizationContext)

  const { cabals } = useSelector((state: RootState) => state.cabals)

  const [newCabalKeyInput, setNewCabalKeyInput] = useState<string>()
  const [newCabalUsernameInput, setNewCabalUsernameInput] = useState<string>()

  const onPressClose = useCallback(() => {
    navigation.navigate('ChannelScreen')
  }, [])

  const onPressCreate = useCallback(() => {}, [])

  const onPressJoin = useCallback(() => {
    console.log({ newCabalKeyInput, newCabalUsernameInput })
  }, [newCabalKeyInput, newCabalUsernameInput])

  return (
    <SafeAreaView>
      {!!cabals.length && (
        <PanelHeader title={t('add_cabal_title')} onPressClose={onPressClose} />
      )}
      <ScrollView>
        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors}>
            {t('add_cabal_join_cabal_section_title')}
          </SectionHeaderText>
          <Input
            placeholder={t('add_cabal_key_input_placeholder')}
            onChangeText={setNewCabalKeyInput}
          />
          <Input
            placeholder={t('add_cabal_name_input_placeholder')}
            onChangeText={setNewCabalUsernameInput}
          />
          <Button title={t('add_cabal_join_button')} onPress={onPressJoin} />
        </PanelSection>

        <PanelSection colors={colors}>
          <SectionHeaderText colors={colors}>
            {t('add_cabal_new_cabal_section_title')}
          </SectionHeaderText>
          <Button title={t('add_cabal_new_cabal_button')} onPress={onPressCreate} />
        </PanelSection>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddCabalScreen
