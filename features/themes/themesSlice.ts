import { AppThunk } from '../../app/store'
import { ColorSchemeName } from 'react-native'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExtendedTheme } from '@react-navigation/native'

import { CabalDarkTheme, CabalLightTheme } from '../../utils/Themes'

interface ThemesProps {
  currentTheme: ExtendedTheme
  isCustomTheme: boolean
}

export const DEFAULT_DARK_THEMES = [CabalDarkTheme]
export const DEFAULT_LIGHT_THEMES = [CabalLightTheme]
export const DEFAULT_THEMES = [...DEFAULT_DARK_THEMES, ...DEFAULT_LIGHT_THEMES]

const initialState: ThemesProps = {
  currentTheme: DEFAULT_THEMES[0],
  isCustomTheme: false,
}

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ExtendedTheme>) {
      state.isCustomTheme = !DEFAULT_THEMES.map((theme) => theme.name).includes(
        action.payload.name,
      )
      state.currentTheme = action.payload
    },
  },
})

export const { setTheme } = themesSlice.actions

export default themesSlice.reducer

// On change of system color mode: dark or light
export const setColorMode = (colorSchemeName: ColorSchemeName): AppThunk => async (
  dispatch,
  getState,
) => {
  if (!getState().themes.isCustomTheme) {
    const theme =
      colorSchemeName === 'dark' ? DEFAULT_DARK_THEMES[0] : DEFAULT_LIGHT_THEMES[0]
    dispatch(setTheme(theme))
  }
}
