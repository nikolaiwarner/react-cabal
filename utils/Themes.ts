import { DarkTheme, DefaultTheme, ExtendedTheme } from '@react-navigation/native'

/*
Default color strings from React Navigation:
- primary (string): The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
- background (string): The color of various backgrounds, such as background color for the screens.
- card (string): The background color of card-like elements, such as headers, tab bars etc.
- text (string): The text color of various elements.
- border (string): The color of borders, e.g. header border, tab bar border etc.
- notification (string): The color of Tab Navigator badge.

Colors strings unique to Cabal. See `definitions.d.ts` to extend:
- textHighlight (string): Text color that pops a bit more than `text`
- textSofter (string): Text color that's softer than `text`
*/

export const CabalLightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(90, 72, 236)',
    text: 'rgb(28, 28, 33)',
    textHighlight: 'rgb(168, 153, 223)',
    textSofter: 'rgb(32, 32, 32)',
  },
}

export const CabalDarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: 'rgb(28, 28, 33)',
    border: 'rgb(70, 70, 70)',
    primary: 'rgb(90, 72, 236)',
    text: '#fff',
    textHighlight: 'rgb(168, 153, 223)',
    textSofter: 'rgb(169, 169, 169)',
  },
}
