import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import '../../src/utils/polyfills';
import '@shopify/flash-list/jestSetup';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('lodash', () => {
  const module = jest.requireActual('lodash');
  module.debounce = jest.fn(fn => fn);
  return module;
});

// jest.mock('react-native-safe-area-context', () => {
//   const inset = {top: 0, right: 0, bottom: 0, left: 0};
//   return {
//     SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
//     SafeAreaConsumer: jest
//       .fn()
//       .mockImplementation(({children}) => children(inset)),
//     useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
//   };
// });

// jest.mock('react-native-gesture-handler', () => {
//   const {TouchableOpacity, ScrollView, TextInput} =
//     jest.requireActual('react-native');
//   const View = require('react-native/Libraries/Components/View/View');
//   return {
//     GestureHandlerRootView: View,
//     TouchableOpacity,
//     ScrollView,
//     TextInput,
//   };
// });
