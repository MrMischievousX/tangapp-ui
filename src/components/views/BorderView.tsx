import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../utils/dimen';
import {COLORS} from '../../constants/colors';

/**
 * Renders a border.
 *
 * @component
 *
 * @returns {JSX.Element} - The rendered BorderView component.
 */

type Props = {};

const BorderView = (props: Props) => <View style={styles.main} />;

export default memo(BorderView);

const styles = StyleSheet.create({
  main: {
    height: scale(1),
    width: '100%',
    backgroundColor: COLORS.primaryBorder,
  },
});
