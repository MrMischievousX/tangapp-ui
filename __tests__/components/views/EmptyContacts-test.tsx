/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import EmptyContacts from '../../../src/components/views/EmptyContacts';

describe('Testing EmptyContacts Component', () => {
  it('Should render EmptyContacts', () => {
    renderer.create(<EmptyContacts />);
  });
});
