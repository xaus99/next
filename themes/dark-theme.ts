import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    },
    info: {
      main: '#ffffff'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          height: 60
        },
      }
    },

    MuiTypography: {
      defaultProps: {
        color: '#ffffff',
      },
      styleOverrides: {
        root: {
          color: 'black',
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease-in-out',
            color: 'white'
          }
        },
        h1: {
          fontSize: 30,
          fontWeight: 600,
          color: '#ffffff'
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
          color: '#ffffff'
        },
        h6: {
          fontSize: 20,
          fontWeight: 400,
          color: '#ffffff'
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
          color: '#ffffff'
        }
      }
    },


    MuiButtonBase: { // icons
      defaultProps: {
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease-in-out',
            color: 'white'
          }
        }
      }
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          background: 'white',
          color: 'black',
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease-in-out',
            color: 'white'
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(255,255,255,0.05)',
          borderRadius: '10px',
        }
      }
    },

    MuiListItemText: {
      defaultProps: {
        color: '#ffffff'
      }
    }

  }
});
