import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useColorScheme } from 'react-native'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import React, { useEffect, useMemo, useState, useRef } from 'react'

import { LocalizationContext } from './utils/Translations'
import { RootState } from './app/rootReducer'
import { setColorMode } from './features/themes/themesSlice'
import AddCabalScreen from './screens/AddCabalScreen'
import CabalSettingsScreen from './screens/CabalSettingsScreen'
import ChannelBrowserScreen from './screens/ChannelBrowserScreen'
import ChannelDetailScreen from './screens/ChannelDetailScreen'
import ChannelScreen from './screens/ChannelScreen'
import Sidebar from './components/Sidebar'
import store from './app/store'
import ThemeEditorScreen from './screens/ThemeEditorScreen'
import useIsMobile from './hooks/useIsMobile'
import UserProfileScreen from './screens/UserProfileScreen'
import useCabal from './hooks/useCabal'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function ScreensContainer() {
  const colorMode = useColorScheme()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const { cabalClient, initializeCabal } = useCabal()

  const { currentTheme } = useSelector((state: RootState) => state.themes)

  useEffect(() => {
    dispatch(setColorMode(colorMode))
  }, [colorMode])

  useEffect(() => {
    const key = '1fdc83d08699781adfeacba9aa6bb880203d5e61357e5667ccbcc12e4a9065ad'
    initializeCabal({ key })
  }, [])

  return (
    <NavigationContainer theme={currentTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        drawerStyle={isMobile ? { width: '90%' } : null}
        drawerType={isMobile ? 'front' : 'permanent'}
        initialRouteName="ChannelScreen"
      >
        <Drawer.Screen name="AddCabalScreen" component={AddCabalScreen} />
        <Drawer.Screen name="CabalSettingsScreen" component={CabalSettingsScreen} />
        <Drawer.Screen name="ChannelBrowserScreen" component={ChannelBrowserScreen} />
        <Drawer.Screen name="ChannelDetailScreen" component={ChannelDetailScreen} />
        <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
        <Drawer.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Drawer.Screen name="ThemeEditorScreen" component={ThemeEditorScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  const [locale, setLocale] = useState(Localization.locale)
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  )

  return (
    <Provider store={store}>
      <LocalizationContext.Provider value={localizationContext}>
        <ScreensContainer />
      </LocalizationContext.Provider>
    </Provider>
  )
}
