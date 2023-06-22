/**
 * @format
 */

import {Platform} from 'react-native';
import {
  guidelineBaseWidthAndroid,
  isSmallDevice,
  scale,
} from '../../src/utils/dimen';

jest.mock('react-native', () => {
  const {Platform, PixelRatio} = jest.requireActual('react-native');
  return {
    Platform,
    PixelRatio,
    Dimensions: {
      get: jest.fn().mockReturnValue({width: 375, height: 666}),
    },
  };
});

describe('Testing scale function for small device', () => {
  it('Should give resized values', () => {
    expect(scale(10)).toBeLessThanOrEqual(10);
    Platform.OS = 'android';
    expect(scale(10)).toBeLessThanOrEqual(10);
  });

  it('Should return device size', () => {
    expect(isSmallDevice).toEqual(true);
    expect(guidelineBaseWidthAndroid).toEqual(400);
  });
});
