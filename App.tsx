import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import * as React from 'react'

import { CabalDarkTheme, CabalLightTheme } from './utils/Themes'
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

  return (
    <Provider store={store}>
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
    </Provider>
  )
}
