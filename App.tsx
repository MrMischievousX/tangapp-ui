// In App.js in a new project

import {StatusBar} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {COLORS} from './src/constants/colors';

function App() {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primaryBg}
        barStyle={'light-content'}
      />
      <MainNavigator />
    </>
  );
}

export default App;
