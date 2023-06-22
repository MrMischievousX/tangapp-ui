import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {height} from '../../utils/dimen';
import {COLORS} from '../../constants/colors';

/**
 * Renders a loading indicator when there are no contacts.
 *
 * @component
 *
 * @returns {JSX.Element} - The rendered loader component.
 */

type Props = {};

const EmptyContacts = (props: Props) => (
  <View style={styles.main}>
    <ActivityIndicator size={'large'} color={COLORS.primaryBtn} />
  </View>
);

export default memo(EmptyContacts);

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
