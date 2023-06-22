import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../utils/dimen';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {OptionBtnProps} from '../../../typings';

/**
 * Renders a list of buttons representing phone numbers associated with a label.
 * When a button is pressed, it triggers the navigateFnc function with the corresponding phone number.
 *
 * @component
 *
 * @param {Object} contact - The contact object containing phone numbers.
 * @param {Function} navigateFnc - The function to be called when a button is pressed.
 *
 * @returns {JSX.Element} - The rendered OptionBtn component.
 */

const OptionBtn = ({contact, navigateFnc}: OptionBtnProps) => {
  return (
    <View style={styles.main} testID="optionBtnView">
      {contact?.phoneNumbers.map((item, index) => {
        return (
          <TouchableOpacity
            testID={`optionBtn${index}`}
            activeOpacity={0.8}
            style={styles.btn}
            key={index}
            onPress={() => {
              navigateFnc(item?.number);
            }}>
            <Text style={styles.phoneLabel} key={index}>
              {item.label.toCapitalize()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(OptionBtn);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
    width: '100%',
    flexWrap: 'wrap',
  },
  phoneLabel: {
    ...FONTS.ctaText,
    marginVertical: scale(2),
  },
  btn: {
    paddingHorizontal: scale(16),
    backgroundColor: COLORS.primaryBtn,
    paddingVertical: scale(8),
    borderRadius: scale(8),
    marginVertical: scale(8),
  },
});
