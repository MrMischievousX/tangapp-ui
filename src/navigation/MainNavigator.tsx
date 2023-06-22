import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {COLORS} from '../constants/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

type Props = {};

const MainNavigator = (props: Props) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
