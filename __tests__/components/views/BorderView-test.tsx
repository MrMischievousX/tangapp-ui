/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import BorderView from '../../../src/components/views/BorderView';

describe('Testing BorderView Component', () => {
  it('Should render BorderView', () => {
    renderer.create(<BorderView />);
  });
});
