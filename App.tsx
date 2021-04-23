import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { useColorScheme } from 'react-native'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import React, { useMemo, useState } from 'react'

import { CabalDarkTheme, CabalLightTheme } from './utils/Themes'
import { LocalizationContext } from './utils/Translations'
import AddCabalScreen from './screens/AddCabalScreen'
import CabalSettingsScreen from './screens/CabalSettingsScreen'
import ChannelBrowserScreen from './screens/ChannelBrowserScreen'
import ChannelDetailScreen from './screens/ChannelDetailScreen'
import ChannelScreen from './screens/ChannelScreen'
import Sidebar from './components/Sidebar'
import store from './app/store'
import useIsMobile from './hooks/useIsMobile'
import UserProfileScreen from './screens/UserProfileScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  const colorScheme = useColorScheme()
  const isMobile = useIsMobile()

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
        <NavigationContainer
          theme={colorScheme === 'dark' ? CabalDarkTheme : CabalLightTheme}
        >
          <Drawer.Navigator
            drawerContent={(props) => <Sidebar {...props} />}
            initialRouteName="ChannelScreen"
            drawerType={isMobile ? 'front' : 'permanent'}
            drawerStyle={isMobile ? { width: '90%' } : null}
          >
            <Drawer.Screen name="AddCabalScreen" component={AddCabalScreen} />
            <Drawer.Screen name="CabalSettingsScreen" component={CabalSettingsScreen} />
            <Drawer.Screen name="ChannelBrowserScreen" component={ChannelBrowserScreen} />
            <Drawer.Screen name="ChannelDetailScreen" component={ChannelDetailScreen} />
            <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
            <Drawer.Screen name="UserProfileScreen" component={UserProfileScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </LocalizationContext.Provider>
    </Provider>
  )
}
