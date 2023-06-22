import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Contact} from 'react-native-contacts';

export interface ScreenProps {
  navigation: NavigationProp<any>;
  route?: RouteProp<any> | any;
}

interface PhoneNumber {
  label: string;
  number: string;
}

interface UrlAddress {
  label: string;
  url: string;
}

interface EmailAddress {
  label: string;
  email: string;
}

interface PostalAddress {
  state: string;
  label: string;
  region: string;
  postCode: string;
  country: string;
  city: string;
  street: string;
}

export interface ContactProps {
  jobTitle: string;
  emailAddresses: EmailAddress[];
  urlAddresses: UrlAddress[];
  phoneNumbers: PhoneNumber[];
  recordID: string;
  postalAddresses: PostalAddress[];
  thumbnailPath: string;
  company: string;
  middleName: string;
  imAddresses: [];
  givenName: string;
  birthday: {day: number; month: number; year: number};
  hasThumbnail: boolean;
  familyName: string;
}

export interface OptionBtnProps {
  contact: Contact;
  navigateFnc: Function;
}
