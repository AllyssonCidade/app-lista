import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdicionarTask from '../screens/adicionarTask';
import { PropsStackRoutes } from './interfaces';
import { Home } from '../screens/home';
import AuthProvider from '@/src/contexts/auth'

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigation = () => {
  return (
    <AuthProvider>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="AdicionarTask" component={AdicionarTask} options={{ headerShown: false }} />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default AppNavigation;
