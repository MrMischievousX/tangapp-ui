import {scale} from '../utils/dimen';
import {COLORS} from './colors';
import {StyleSheet} from 'react-native';

const fonts = StyleSheet.create({
  primaryHeading: {
    fontWeight: '500',
    fontSize: scale(28),
    color: COLORS.primaryHeading,
    opacity: 0.9,
    marginBottom: scale(16),
  },
  primaryInput: {
    fontSize: scale(24),
    fontWeight: '600',
    color: COLORS.inputText,
    letterSpacing: scale(1),
  },
  primaryBtnText: {
    fontSize: scale(20),
    fontWeight: '500',
    color: COLORS.ctaText,
  },
  searchInput: {
    fontSize: scale(20),
    fontWeight: '600',
    color: COLORS.inputText,
    letterSpacing: scale(1),
  },
  secondaryHeading: {
    fontSize: scale(20),
    fontWeight: '600',
    color: COLORS.primaryText,
    opacity: 0.8,
  },
  primaryText: {
    color: COLORS.primaryText,
    fontSize: scale(24),
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: scale(16),
    fontWeight: '500',
    color: COLORS.secondaryText,
    opacity: 0.8,
    marginVertical: scale(2),
  },
  ctaText: {
    fontSize: scale(16),
    fontWeight: '500',
    color: COLORS.ctaText,
    letterSpacing: scale(1),
  },
});

export const FONTS = fonts;
