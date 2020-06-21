import { Theme } from 'vuetify/types/services/theme'

export const darkTheme = (theme: Theme) => {
  const dark = window.matchMedia('(prefers-color-scheme: dark)')
  theme.dark = dark.matches
  dark.addEventListener('change', ({ matches }) => (theme.dark = matches))

  const toggleDarkTheme = () => (theme.dark = !theme.dark)

  return { toggleDarkTheme }
}
