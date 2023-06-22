import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import {ROUTES} from '../constants/routes';

type Props = {};

const Stack = createStackNavigator();

const StackNavigator = ({}: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        gestureEnabled: true,
        animationEnabled: true,
        animationTypeForReplace: 'push',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={ROUTES.home}>
      <Stack.Screen name={ROUTES.home} component={HomeScreen} />
      <Stack.Screen name={ROUTES.contacts} component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
