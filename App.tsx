import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import * as React from 'react'

import { CabalDarkTheme, CabalLightTheme } from './utils/Themes'
import ChannelScreen from './screens/ChannelScreen'
import HomeScreen from './screens/HomeScreen'
import Sidebar from './components/Sidebar'
import store from './app/store'
import useIsMobile from './hooks/useIsMobile'

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
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Cabal' }}
          />
          <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
