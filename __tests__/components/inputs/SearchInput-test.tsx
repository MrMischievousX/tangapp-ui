/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import SearchInput from '../../../src/components/inputs/SearchInput';
import {LOCALES} from '../../../src/constants/locales';

const props = {
  updateSearch: jest.fn(),
  query: '',
};

describe('Testing SearchInput Component', () => {
  it('Should render SearchInput', () => {
    renderer.create(<SearchInput {...props} />);
  });

  it('Should be controlled component', () => {
    const root = renderer.create(<SearchInput {...props} />).root;
    const input = root.findByProps({testID: 'searchInput'});

    expect(input.props.value).toEqual(props.query);
  });

  it('Should have correct placeholder text', () => {
    const root = renderer.create(<SearchInput {...props} />).root;
    const input = root.findByProps({testID: 'searchInput'});

    expect(input.props.placeholder).toEqual(LOCALES.searchName);
  });

  it('Should update input value', () => {
    const root = renderer.create(<SearchInput {...props} />).root;
    const input = root.findByProps({testID: 'searchInput'}).props;

    act(() => input.onChangeText('kate'));
    expect(props.updateSearch).toBeCalledTimes(1);
    expect(props.updateSearch).toBeCalledWith('kate');
  });

  it('Should not have input value of any max length', () => {
    const root = renderer.create(<SearchInput {...props} />).root;

    const input = root.findByProps({testID: 'searchInput'}).props;
    expect(input.maxLength).toBeUndefined();
  });
});
