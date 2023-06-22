/**
 * @format
 */

import {Platform} from 'react-native';
import {
  guidelineBaseWidthAndroid,
  isSmallDevice,
  scale,
} from '../../src/utils/dimen';

describe('Testing scale function for large device', () => {
  it('Should give resized values', () => {
    expect(scale(10)).toBeGreaterThanOrEqual(20);
    Platform.OS = 'android';
    expect(scale(10)).toBeGreaterThanOrEqual(20);
  });

  it('Should return device size', () => {
    expect(isSmallDevice).toEqual(false);
    expect(guidelineBaseWidthAndroid).toEqual(380);
  });
});
