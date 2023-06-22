/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import HomeScreen from '../../src/screens/HomeScreen';
import {ScreenProps} from '../../typings';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ROUTES} from '../../src/constants/routes';

const props: ScreenProps = {
  navigation: {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>,
  route: jest.fn() as unknown as RouteProp<any>,
};

const numberProps: ScreenProps = {
  navigation: {
    navigate: jest.fn(),
  } as unknown as NavigationProp<any>,
  route: {
    params: {number: '1234567890'},
  },
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('Testing HomeScreen Component', () => {
  it('Should render HomeScreen', () => {
    renderer.create(<HomeScreen {...props} />);
  });

  it('Should navigate to ContactScreen', () => {
    const root = renderer.create(<HomeScreen {...props} />).root;
    const btn = root.findByProps({testID: 'pickBtn'}).props;

    act(() => btn.onPress());
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toBeCalledWith(ROUTES.contacts);
  });

  it('Should update input on type', () => {
    const main = renderer.create(<HomeScreen {...props} />);
    const root = main.root;

    const input = root.findByProps({testID: 'phoneInput'}).props;

    act(() => input.onChangeText('1234567890'));
    main.update(<HomeScreen {...props} />);

    const newInput = root.findByProps({testID: 'phoneInput'}).props;
    expect(newInput.value).toEqual('1234567890');
  });
});

describe('Testing HomeScreen Component with number in prop', () => {
  const useEffectMock = jest.spyOn(React, 'useEffect');
  it('Should render HomeScreen with prop', () => {
    const root = renderer.create(<HomeScreen {...numberProps} />).root;
    act(() => useEffectMock.mock.calls[0][0]());
    const input = root.findByProps({testID: 'phoneInput'}).props;
    expect(input.value).toEqual('1234567890');
  });
});
