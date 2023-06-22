import {PermissionsAndroid, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {onAndroid, scale} from '../utils/dimen';
import Contacts, {Contact} from 'react-native-contacts';
import ContactItem from '../components/views/ContactItem';
import {FlashList} from '@shopify/flash-list';
import {debounce} from 'lodash';
import {ROUTES} from '../constants/routes';
import {ScreenProps} from '../../typings';
import HeadingText from '../components/texts/HeadingText';
import {LOCALES, PERMISSION} from '../constants/locales';
import SearchInput from '../components/inputs/SearchInput';
import EmptyContacts from '../components/views/EmptyContacts';
import BorderView from '../components/views/BorderView';
import {COLORS} from '../constants/colors';

/**
 * Renders the contact screen with a list of contacts and search functionality.
 *
 * @component
 *
 * @param {Object} navigation - The navigation object from React Navigation.
 *
 * @returns {JSX.Element} - The rendered ContactScreen component.
 */

interface Props extends ScreenProps {}

const ContactScreen = ({navigation}: Props) => {
  const [contactsList, setContactsList] = React.useState<Contact[]>([]);
  const [filteredContactsList, setFilteredContactsList] = React.useState<
    Contact[]
  >([]);
  const [query, setQuery] = React.useState<string>('');

  React.useEffect(() => {
    const fetchContacts = () => {
      Contacts.getAll()
        .then(contacts => {
          setContactsList(contacts);
        })
        .catch(e => {
          // console.log('Failed to fetch contacts');
        });
    };

    if (onAndroid()) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PERMISSION.readContacts,
      )
        .then(res => {
          if (res === 'granted') fetchContacts();
        })
        .catch(error => {
          // console.error('Permission error: ', error);
        });
    } else {
      fetchContacts();
    }
  }, []);

  const temp = (contactsList: Contact[], query: string) => {
    const filterList = contactsList.filter(item => {
      return (
        item?.displayName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.givenName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.familyName?.toLowerCase()?.includes(query?.toLowerCase())
      );
    });

    setFilteredContactsList(filterList);
  };

  React.useEffect(() => {
    if (contactsList.length > 0) searchUser(contactsList, query);
  }, [query, contactsList]);

  // Debounced search query
  const searchUser = React.useCallback(debounce(temp, 300), []);

  // Memoized function to navigate home
  const navigateFnc = React.useCallback((number: string) => {
    navigation.navigate(ROUTES.home, {
      number,
    });
  }, []);

  // Memoized search text update function
  const updateSearch = React.useCallback((q: string) => {
    setQuery(q);
  }, []);

  // Memoized render item component
  const renderItem = React.useCallback(
    ({item}: {item: Contact; index: number}) => (
      <ContactItem contact={item} navigateFnc={navigateFnc} />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <SearchInput updateSearch={updateSearch} query={query} />
        <HeadingText title={LOCALES.allContacts} />
        <FlashList
          testID="contactsList"
          data={filteredContactsList}
          ListEmptyComponent={<EmptyContacts />}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.recordID}${index}`}
          estimatedItemSize={scale(80)}
          ItemSeparatorComponent={() => <BorderView />}
          contentContainerStyle={styles.flashlistContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  flashlistContent: {
    paddingBottom: scale(24),
  },
});
