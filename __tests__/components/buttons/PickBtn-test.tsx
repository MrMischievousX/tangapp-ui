/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import PickBtn from '../../../src/components/buttons/PickBtn';
import {LOCALES} from '../../../src/constants/locales';

const props = {
  navigateContacts: jest.fn(),
};

jest.clearAllMocks();
jest.clearAllTimers();

describe('Testing PickBtn Component', () => {
  it('Should render PickBtn', () => {
    renderer.create(<PickBtn {...props} />);
  });

  it('Should invoke navigateContacts function', () => {
    const root = renderer.create(<PickBtn {...props} />).root;

    const btn = root.findByProps({
      testID: 'pickBtn',
    }).props;

    act(() => btn.onPress());

    expect(props.navigateContacts).toHaveBeenCalledTimes(1);
  });

  it('Should have correct title', () => {
    const root = renderer.create(<PickBtn {...props} />).root;

    const title = root.findByProps({
      testID: 'pickBtnTxt',
    }).props;

    expect(title.children).toEqual(LOCALES.pickFromContacts);
  });
});
