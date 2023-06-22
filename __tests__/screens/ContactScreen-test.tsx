/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import ContactScreen from '../../src/screens/ContactScreen';
import {ScreenProps} from '../../typings';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {tempContact} from '../../src/constants/helper';
import {ROUTES} from '../../src/constants/routes';
import Contacts from '../__mocks__/react-native-contacts';
import * as helpers from '../../src/utils/dimen';

const props: ScreenProps = {
  navigation: {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>,
  route: jest.fn() as unknown as RouteProp<any>,
};

jest.mock('react-native-contacts');
Contacts.getAll = jest.fn(_ => Promise.resolve(tempContact));

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => {
    const PermissionsAndroid = jest.requireActual(
      'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
    );
    return {
      ...PermissionsAndroid,
      check: jest.fn(() => new Promise(resolve => resolve('granted'))),
      request: jest.fn(() => new Promise(resolve => resolve('granted'))),
    };
  },
);

it('SKIP', () => {});

describe('Testing ContactScreen Component with useEffect running', () => {
  const useEffectMock = jest.spyOn(React, 'useEffect');
  const useStateSpy = jest.spyOn(React, 'useState');
  const mockSetState = jest.fn();

  Contacts.getAll = jest.fn(_ => Promise.resolve());

  useStateSpy
    .mockImplementationOnce(() => [tempContact, mockSetState])
    .mockImplementationOnce(() => [tempContact, mockSetState])
    .mockImplementationOnce(() => ['', mockSetState]);

  const main = renderer.create(<ContactScreen {...props} />);
  const root = main.root;

  const flashList = root.findByProps({testID: 'contactsList'});
  const flashItems = flashList.findAllByProps({testID: 'contactItem'});
  act(() => flashItems[0].props.onPress());

  expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
  expect(props.navigation.navigate).toHaveBeenCalledWith(ROUTES.home, {
    number: tempContact[0].phoneNumbers[0].number,
  });
});

describe('Testing ContactScreen Component for query update', () => {
  const useEffectMock = jest.spyOn(React, 'useEffect');
  const useStateSpy = jest.spyOn(React, 'useState');
  const mockSetState = jest.fn();

  useStateSpy
    .mockImplementationOnce(() => [tempContact, mockSetState])
    .mockImplementationOnce(() => [[], mockSetState])
    .mockImplementationOnce(() => ['ka', mockSetState]);

  const main = renderer.create(<ContactScreen {...props} />);
  useEffectMock.mock.calls[0][0]();
});

describe('Testing ContactScreen Component for query update android', () => {
  const useEffectMock = jest.spyOn(React, 'useEffect');
  const useStateSpy = jest.spyOn(React, 'useState');
  const mockSetState = jest.fn();

  helpers.onAndroid = jest.fn(() => true);

  useStateSpy
    .mockImplementationOnce(() => [[], mockSetState])
    .mockImplementationOnce(() => [[], mockSetState])
    .mockImplementationOnce(() => ['', mockSetState]);

  const main = renderer.create(<ContactScreen {...props} />);
  useEffectMock.mock.calls[0][0]();

  jest.clearAllMocks();
  jest.restoreAllMocks();
});

// it('Modify', async () => {
//   jest.setTimeout(10 * 1000);
//   await new Promise(resolve => setTimeout(resolve('1'), 2000));
// }, 10000);

// useEffectMock.mock.calls[1][0]();

// const input = root.findByProps({testID: 'searchInput'}).props;
// const flashItems = root.findAllByProps({testID: 'contactItem'});
// console.log(flashItems.length);

// act(() => main.update(<ContactScreen {...props} />));
// const newInput = root.findByProps({testID: 'searchInput'}).props;
// act(() => input.onChangeText('Ka'));
// expect(mockSetState).toHaveBeenCalled();

// const newInput = root.findByProps({testID: 'searchInput'}).props;

// expect(newInput.value).toEqual('Kate');
