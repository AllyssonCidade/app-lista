import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdicionarTask from '../screens/adicionarTask';
import { PropsStackRoutes } from './interfaces';
import { Home } from '../screens/home';
import AuthProvider from '@/src/contexts/authContext'
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../database/initializeDatabase';

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigation = () => {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="AdicionarTask" component={AdicionarTask} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AuthProvider>
    </SQLiteProvider>
  );
};

export default AppNavigation;
