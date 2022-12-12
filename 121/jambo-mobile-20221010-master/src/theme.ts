import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#ccb7eb',
      100: '#9f7cd3',
      200: '#8f63d1',
      300: '#7e4dc7',
      400: '#6f3eb9',
      500: '#5a2ba1',
      600: '#461A86',
      700: '#361369',
      800: '#2a0f53',
      900: '#1d0b3a',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  // config: {
  //   initialColorMode: 'dark',
  // },
  fontConfig: {
    Poppins: {
      100: {
        normal: "Avenir-Light",
      },
      200: {
        normal: "Avenir-Light",
      },
      300: {
        normal: "Avenir-Light",
      },
      400: {
        normal: "Avenir-regular",
      },
      500: {
        normal: "Avenir-medium",
      },
      600: {
        normal: "Avenir-medium",
      },
      700: {
        normal: 'Avenir-bold',
      },
      800: {
        normal: 'Avenir-bold',
      },
      900: {
        normal: 'Avenir-bold',
      },
      'bold': {
        normal: 'Avenir-bold',
      }
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
  components: {
    Text: {
      baseStyle: {
        color: '#333'
      },
      defaultProps: {
        size: 'md'
      },
      sizes: {
        '4xl': {
          fontSize: 56
        },
        '3xl': {
          fontSize: 46
        },
        '2xl': {
          fontSize: 36
        },
        xl: {
          fontSize: 24
        },
        lg: {
          fontSize: 18
        },
        md: {
          fontSize: 14
        },
        sm: {
          fontSize: 12
        }
      }
    },
    Input: {
      baseStyle: {
        color: '#333',
        borderRadius: 9,
        borderColor: '#EFF2F4',
        placeholderTextColor: '#B5B7CA',
        backgroundColor: '#EFF2F4',
        _focus: {
          _ios: {
            selectionColor: 'primary.600'
          },
          _android: {
            selectionColor: 'primary.600'
          }
        }
      }
    },
    Button: {
      baseStyle: {
        borderRadius: 9
      },
      defaultProps: {
        android_ripple: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    IconButton: {
      defaultProps: {
        colorScheme: 'rgba(0, 0, 0, 0.1)',
        android_ripple: {
          color: 'rgba(0,0,0,0)'
        }
      }
    },
    Pressable: {
      defaultProps: {
        android_ripple: {
          color: 'rgba(0,0,0,0.1)',
          foreground: true
        }
      }
    },
    Image: {
      defaultProps: {
        alt: 'Image'
      }
    }
  }
});

export default theme;