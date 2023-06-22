/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HeadingText from '../../../src/components/texts/HeadingText';
import {LOCALES} from '../../../src/constants/locales';

describe('Testing HeadingText Component', () => {
  it('Should render LabelText', () => {
    renderer.create(<HeadingText title={LOCALES.enterPhoneNumber} />);
  });

  it('Should render correct title', () => {
    const root = renderer.create(
      <HeadingText title={LOCALES.enterPhoneNumber} />,
    ).root;
    const textProps = root.findByProps({testID: 'homeTitle'}).props;
    expect(textProps.children).toEqual(LOCALES.enterPhoneNumber);
  });
});
