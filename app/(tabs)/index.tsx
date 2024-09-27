import { initializeDatabase } from '@/src/database/initializeDatabase';
import AppNavigation from '@/src/routes';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react'; 

export default function App() {   
    return (
      <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AppNavigation/> 
      </SQLiteProvider>
    ) 
}
