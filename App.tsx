import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RootNavigation from './src/screens/LoginSignup/RootNavigation';
import { MyContext, MyProvider} from './src/Global/Context';
import auth from '@react-native-firebase/auth';

const App = () => {
  
  return (
    <MyProvider  >
      <RootNavigation />
    </MyProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
