/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {singleContact} from '../../../src/constants/helper';
import OptionBtn from '../../../src/components/buttons/OptionBtn';
import {OptionBtnProps} from '../../../typings';

const props: OptionBtnProps = {
  contact: singleContact,
  navigateFnc: jest.fn(),
};

describe('Testing OptionBtn Component', () => {
  it('Should render OptionBtn', () => {
    renderer.create(<OptionBtn {...props} />);
  });

  it('Should list all numbers', () => {
    const root = renderer.create(<OptionBtn {...props} />).root;

    const btnView = root.findByProps({
      testID: 'optionBtnView',
    }).props;

    expect(btnView.children.length).toEqual(singleContact.phoneNumbers.length);
  });

  it('Should invoke navigateFnc function with correct parameter for 1st number', () => {
    const root = renderer.create(<OptionBtn {...props} />).root;

    const btn = root.findByProps({
      testID: 'optionBtn0',
    }).props;

    act(() => btn.onPress());

    expect(props.navigateFnc).toHaveBeenCalledTimes(1);
    expect(props.navigateFnc).toHaveBeenCalledWith(
      singleContact.phoneNumbers[0].number,
    );
  });

  it('Should invoke navigateFnc function with correct parameter for 2nd number', () => {
    const root = renderer.create(<OptionBtn {...props} />).root;

    const btn = root.findByProps({
      testID: 'optionBtn1',
    }).props;

    act(() => btn.onPress());

    expect(props.navigateFnc).toHaveBeenCalledTimes(1);
    expect(props.navigateFnc).toHaveBeenCalledWith(
      singleContact.phoneNumbers[1].number,
    );
  });
});
