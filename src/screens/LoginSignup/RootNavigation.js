import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
   return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
