/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import StackNavigator from '../../src/navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

describe('Testing Stack Navigator', () => {
  it('Should render Stack Navigator', () => {
    renderer.create(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    );
  });
});
