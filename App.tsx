import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'

import ReactCabal from './app/App'
import store from './app/store'

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <ReactCabal />
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
