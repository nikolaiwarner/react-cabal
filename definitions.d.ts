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
      buttonBackground: string
      buttonBorder: string
      buttonText: string
      textHighlight: string
      textSofter: string
    }
    name: string
  }
  export function useTheme(): ExtendedTheme
}
