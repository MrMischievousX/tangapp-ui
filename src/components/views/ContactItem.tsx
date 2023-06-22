import React, {Fragment, memo, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scale} from '../../utils/dimen';
import {Contact} from 'react-native-contacts';
import OptionBtn from '../buttons/OptionBtn';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

/**
 * Renders a contact item with contact information and options to navigate.
 *
 * @component
 *
 * @param {Object} contact - The contact object containing contact information.
 * @param {Function} navigateFnc - The function to be called when navigating based on the contact.
 *
 * @returns {JSX.Element|null} - The rendered ContactItem component or null if there are no phone numbers.
 */

interface Props {
  contact: Contact;
  navigateFnc: Function;
}

const ContactItem = ({contact, navigateFnc}: Props) => {
  if (contact?.phoneNumbers.length <= 0) return null;

  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        testID="contactItem"
        activeOpacity={0.8}
        onPress={() => {
          if (contact?.phoneNumbers?.length > 1) {
            setShowOptions(!showOptions);
          } else navigateFnc(contact?.phoneNumbers[0]?.number);
        }}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            {contact?.hasThumbnail ? (
              <Image
                testID="contactItemImage"
                source={{uri: contact?.thumbnailPath}}
                style={styles.image}
              />
            ) : (
              <Text style={FONTS.primaryText} testID="contactItemImageChar">
                {contact.displayName
                  ? contact.displayName[0]
                  : contact.givenName[0]}
              </Text>
            )}
          </View>
          <View style={styles.contactData}>
            <Text style={FONTS.secondaryHeading}>
              {contact?.displayName
                ? contact?.displayName
                : `${contact?.givenName} ${contact?.familyName}`}
            </Text>
            <View testID="contactItemNumber">
              {contact?.phoneNumbers.map((item, index) => {
                return (
                  <Text style={FONTS.secondaryText} key={index}>
                    {`${item.label.toCapitalize()} : ${item.number}`}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {showOptions && (
        <View testID="contactItemOption">
          <OptionBtn contact={contact} navigateFnc={navigateFnc} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(16),
    minHeight: scale(80),
  },
  imgContainer: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(56),
    marginRight: scale(16),
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.primaryBorder,
  },
  contactData: {
    width: '76%',
  },

  image: {
    width: scale(64),
    height: scale(64),
  },
});
export default memo(ContactItem);
