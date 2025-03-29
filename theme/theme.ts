import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    primary: '#0063E6',
    background: '#F5F5F5',
    text: '#212121',
    white: '#FFFFFF',
    gray: '#BDBDBD',
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  textVariants: {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
      padding: 'md',
      borderRadius: 8,
      alignItems: 'center',
    },
  },
});

export type Theme = typeof theme;
export default theme;
