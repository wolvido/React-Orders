import {
  DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(15, 119, 107)',
        accent: 'rgb(209, 235, 232)',
        background: 'white',
    },
};

export default theme;