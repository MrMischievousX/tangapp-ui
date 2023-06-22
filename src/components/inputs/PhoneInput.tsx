import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {LOCALES} from '../../constants/locales';
import {scale} from '../../utils/dimen';
import {FONTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';

/**
 * Renders a text input for entering a phone number.
 *
 * @component
 *
 * @param {string} number - The current phone number value.
 * @param {Function} memChangeNumber - The function to be called when the phone number is changed.
 *
 * @returns {JSX.Element} - The rendered PhoneInput component.
 */

type Props = {
  number: string;
  memChangeNumber: Function;
};

const PhoneInput = ({number, memChangeNumber}: Props) => {
  return (
    <TextInput
      testID="phoneInput"
      placeholder={LOCALES.enterNumber}
      placeholderTextColor={COLORS.inputText}
      onChangeText={e => memChangeNumber(e)}
      value={number}
      keyboardType="numeric"
      maxLength={10}
      style={styles.numberInput}
    />
  );
};

export default memo(PhoneInput);

const styles = StyleSheet.create({
  numberInput: {
    ...FONTS.primaryInput,
    height: scale(64),
    width: '100%',
    borderRadius: scale(8),
    paddingHorizontal: scale(16),
    borderColor: COLORS.primaryBorder,
    borderWidth: 1,
    marginTop: scale(8),
  },
});
