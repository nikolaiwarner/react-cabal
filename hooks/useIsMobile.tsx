import { useWindowDimensions } from 'react-native'
import React from 'react'

export default function useIsMobile() {
  const windowWidth = useWindowDimensions().width

  return windowWidth < 800
}
