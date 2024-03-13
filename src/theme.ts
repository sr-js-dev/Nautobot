import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    intermediate: Palette['primary']
    archived: Palette['primary']
    progress: Palette['primary']
    blue: Palette['primary']
    danger: Palette['primary']
    green: Palette['primary']
  }

  interface PaletteOptions {
    intermediate: PaletteOptions['primary']
    archived: PaletteOptions['primary']
    progress: PaletteOptions['primary']
    blue: PaletteOptions['primary']
    danger: PaletteOptions['primary']
    green: PaletteOptions['primary']
  }
}

export const primary = '#5FB158'
const secondary = '#4472C4'
const intermediate = '#404040'
const brandGreen = '#5FB158'

const theme = createTheme({
  palette: {
    primary: {
      main: `${primary}`,
    },
    secondary: {
      light: '#6194c9',
      main: `${secondary}`,
      dark: '#0e56a1',
    },
    intermediate: {
      main: `${intermediate}`,
    },
    archived: {
      main: '#797979',
    },
    progress: {
      main: '#FFC003',
    },
    blue: {
      main: '#4472C4',
    },
    danger: {
      main: '#dc3545',
    },
    green: {
      main: brandGreen,
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: 'white',
          height: 48,
          borderRadius: 3,
          padding: '0 30px',
        },
        containedPrimary: {
          color: '#ffffff',
        },
      },
    },
  },
})

export default theme
