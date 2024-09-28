import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsStackRoutes } from './interfaces';
import { StatusBar } from 'react-native';
import { AppStack } from './appStack';
import { AuthStack } from './authStack';
import { AuthContext } from '../contexts/auth';

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigation = () => {
  
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <>
      <StatusBar hidden barStyle={'dark-content'} backgroundColor="#8fe1d745" />
          {isAuthenticated ? <AuthStack /> : <AppStack  />}
    </>
  );
};

export default AppNavigation;
