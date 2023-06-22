import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {scale} from '../utils/dimen';
import {ROUTES} from '../constants/routes';
import {ScreenProps} from '../../typings';
import HeadingText from '../components/texts/HeadingText';
import {LOCALES} from '../constants/locales';
import PhoneInput from '../components/inputs/PhoneInput';
import PickBtn from '../components/buttons/PickBtn';
import {COLORS} from '../constants/colors';

/**
 * Renders the home screen with a phone number input and a pick from contacts button.
 *
 * @component
 *
 * @param {Object} navigation - The navigation object from React Navigation.
 * @param {Object} route - The route object from React Navigation.
 *
 * @returns {JSX.Element} - The rendered HomeScreen component.
 */

interface Props extends ScreenProps {}

const HomeScreen = ({navigation, route}: Props) => {
  const [number, setNumber] = React.useState<string>('');

  React.useEffect(() => {
    // Checking if number has been returned from contacts screen
    if (route?.params && route?.params?.number)
      setNumber(route?.params?.number);
  }, [route]);

  // Memoized function to update number
  const memChangeNumber = (num: string) => {
    setNumber(num);
  };

  // Memoized function to navigate
  const navigateContacts = React.useCallback(() => {
    navigation.navigate(ROUTES.contacts);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <HeadingText title={LOCALES.enterPhoneNumber} />
        <PhoneInput number={number} memChangeNumber={memChangeNumber} />
        <PickBtn navigateContacts={navigateContacts} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  container: {
    flex: 1,
    padding: scale(20),
  },
});
