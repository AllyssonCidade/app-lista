import { initializeDatabase } from '@/src/database/initializeDatabase';
import AppNavigation from '@/src/routes';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react'; 
import { AuthProvider } from '@/src/contexts/auth';

export default function App() {   
    return (
      <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
        <AppNavigation/> 
      </AuthProvider>
      </SQLiteProvider>
    ) 
}
