/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import PhoneInput from '../../../src/components/inputs/PhoneInput';
import {LOCALES} from '../../../src/constants/locales';

const props = {
  number: '1234567890',
  memChangeNumber: jest.fn(),
};

describe('Testing PhoneInput Component', () => {
  it('Should render PhoneInput', () => {
    renderer.create(<PhoneInput {...props} />);
  });

  it('Should be controlled component', () => {
    const root = renderer.create(<PhoneInput {...props} />).root;
    const input = root.findByProps({testID: 'phoneInput'});

    expect(input.props.value).toEqual(props.number);
  });

  it('Should have correct placeholder text', () => {
    const root = renderer.create(<PhoneInput {...props} />).root;
    const input = root.findByProps({testID: 'phoneInput'});

    expect(input.props.placeholder).toEqual(LOCALES.enterNumber);
  });

  it('Should update input value', () => {
    const root = renderer.create(<PhoneInput {...props} />).root;
    const input = root.findByProps({testID: 'phoneInput'}).props;

    act(() => input.onChangeText('12345678'));
    expect(props.memChangeNumber).toBeCalledTimes(1);
    expect(props.memChangeNumber).toBeCalledWith('12345678');
  });

  it('Should have input value of max length 10', () => {
    const number = '123456789012';
    const root = renderer.create(
      <PhoneInput {...props} number={number} />,
    ).root;

    const input = root.findByProps({testID: 'phoneInput'}).props;
    expect(input.maxLength).toEqual(10);
  });
});
