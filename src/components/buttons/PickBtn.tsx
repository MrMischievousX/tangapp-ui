import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../utils/dimen';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {LOCALES} from '../../constants/locales';

/**
 * Renders a button to pick contact. When the button is pressed, it triggers the navigateContacts function.
 *
 * @component
 *
 * @param {Function} navigateContacts - The function to be called when the button is pressed.
 *
 * @returns {JSX.Element} - The rendered PickBtn component.
 */

interface Props {
  navigateContacts: Function;
}

const PickBtn = ({navigateContacts}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="pickBtn"
        activeOpacity={0.8}
        onPress={() => navigateContacts()}
        style={styles.btn}>
        <Text style={FONTS.primaryBtnText} testID="pickBtnTxt">
          {LOCALES.pickFromContacts}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PickBtn);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(64),
    borderRadius: scale(8),
    overflow: 'hidden',
    marginTop: scale(32),
  },
  btn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBtn,
  },
});
