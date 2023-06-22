import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {memo} from 'react';
import {LOCALES} from '../../constants/locales';
import {COLORS} from '../../constants/colors';
import {scale} from '../../utils/dimen';
import {FONTS} from '../../constants/fonts';

/**
 * Renders a text input for searching name.
 *
 * @component
 *
 * @param {Function} updateSearch - The function to be called when the search query is updated.
 * @param {string} query - The current search query value.
 *
 * @returns {JSX.Element} - The rendered SearchInput component.
 */

type Props = {
  updateSearch: (e: string) => void;
  query: string;
};

const SearchInput = ({updateSearch, query}: Props) => {
  return (
    <TextInput
      testID="searchInput"
      placeholder={LOCALES.searchName}
      placeholderTextColor={COLORS.inputText}
      style={styles.input}
      onChangeText={updateSearch}
      value={query}
    />
  );
};

export default memo(SearchInput);

const styles = StyleSheet.create({
  input: {
    height: scale(56),
    borderRadius: scale(8),
    borderColor: COLORS.primaryBorder,
    borderWidth: 1,
    ...FONTS.searchInput,
    paddingHorizontal: scale(16),
    marginBottom: scale(24),
  },
});
