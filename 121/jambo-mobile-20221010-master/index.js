/**
 * @format
 */

import App from './App';
import theme from 'src/theme';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { store } from './src/store';
import { NativeBaseProvider } from 'native-base';
import 'react-native-url-polyfill/auto';

const Main = () => (
  <Provider store={store}>
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Main);