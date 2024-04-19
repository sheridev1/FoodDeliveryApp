import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import {HomeScreen} from '../HomeScreen';
import UserProfile from '../UserProfile';
import ProductPage from '../ProductPage';
import Cart from '../Cart';
import PlaceOrder from '../PlaceOrder';
import TrackOrder from '../TrackOrder';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductPage"
        component={ProductPage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrder}
        options={{headerShown: false}}
      />

      <Stack.Screen name="TrackOrder" 
      component={TrackOrder}
      options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
