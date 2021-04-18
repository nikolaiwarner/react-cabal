import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import * as React from 'react'

import ChannelScreen from './screens/ChannelScreen'
import HomeScreen from './screens/HomeScreen'
import Sidebar from './components/Sidebar'
import store from './app/store'
import useIsMobile from './hooks/useIsMobile'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const CabalLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary (string): The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
    // background (string): The color of various backgrounds, such as background color for the screens.
    // card (string): The background color of card-like elements, such as headers, tab bars etc.
    // text (string): The text color of various elements.
    // border (string): The color of borders, e.g. header border, tab bar border etc.
    // notification (string): The color of Tab Navigator badge.
  },
}

const CabalDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
}

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
        >
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Cabal' }}
          />
          <Drawer.Screen
            name="ChannelScreen"
            component={ChannelScreen}
            // options={({ route }) => ({ title: route.params.title })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
