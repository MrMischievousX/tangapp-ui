import {Text} from 'react-native';
import React, {memo} from 'react';
import {FONTS} from '../../constants/fonts';

/**
 * Renders a heading text with the provided title.
 *
 * @component
 *
 * @param {string} title - The title text to be displayed.
 *
 * @returns {JSX.Element} - The rendered HeadingText component.
 */

type Props = {
  title: string;
};

const HeadingText = ({title}: Props) => {
  return (
    <Text testID="homeTitle" style={FONTS.primaryHeading}>
      {title}
    </Text>
  );
};

export default memo(HeadingText);
