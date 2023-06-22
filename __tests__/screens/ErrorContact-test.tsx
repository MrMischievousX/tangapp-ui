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
import Contacts from '../__mocks__/react-native-contacts';
import * as helpers from '../../src/utils/dimen';

const props: ScreenProps = {
  navigation: {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>,
  route: jest.fn() as unknown as RouteProp<any>,
};

jest.mock('react-native-contacts');

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => {
    const PermissionsAndroid = jest.requireActual(
      'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
    );
    return {
      ...PermissionsAndroid,
      check: jest.fn(() => new Promise(resolve => resolve('rejected'))),
      request: jest.fn(() => new Promise(resolve => resolve('rejected'))),
    };
  },
);

Contacts.getAll = jest.fn(_ => Promise.reject());

describe('Testing ContactScreen Component with useEffect running', () => {
  const main = renderer.create(<ContactScreen {...props} />);
  const root = main.root;

  const flashList = root.findByProps({testID: 'contactsList'});
  const flashItems = flashList.findAllByProps({testID: 'contactItem'});
  it('Should have empty contacts on error while fetching contacts', () =>
    expect(flashItems.length).toEqual(0));
});

describe('Testing ContactScreen Component with search query', () => {
  const main = renderer.create(<ContactScreen {...props} />);
  const root = main.root;
  const input = root.findByProps({testID: 'searchInput'}).props;
  act(() => input.onChangeText('Kate'));
  const newInput = root.findByProps({testID: 'searchInput'}).props;
  it('Should update query value', () => expect(newInput.value).toEqual('Kate'));
});

describe('Testing ContactScreen Component for query update android without permission', () => {
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
});
