import { createTheme } from '@mui/material/styles'
import BarcadeBrawlTtf from '../../font/BarcadeBrawl.ttf';
export const theme = createTheme({
    typography: {
      fontFamily: 'BarcadeBrawl, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'BarcadeBrawl';
            font-style: normal;
            font-display: swap;
            font-weight: 300;
            src: local('BarcadeBrawl'), url(${BarcadeBrawlTtf}) format('truetype');
          }
        `,
      },
    },
});