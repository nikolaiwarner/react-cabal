import '@react-navigation/native'

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean
    colors: {
      // Default
      primary: string
      background: string
      card: string
      text: string
      border: string
      notification: string

      //Custom
      textHighlight: string
      textSofter: string
    }
  }
  export function useTheme(): ExtendedTheme
}
