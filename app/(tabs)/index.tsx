import { initializeDatabase } from '@/src/database/initializeDatabase';
import AppNavigation from '@/src/routes';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react'; 
import { AuthProvider } from '@/src/contexts/auth';
import { TasksContext, TasksProvider } from '@/src/contexts/tasksContext';

export default function App() {   
    return (
      <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
        <TasksProvider>
        <AppNavigation/> 
        </TasksProvider>
      </AuthProvider>
      </SQLiteProvider>
    ) 
}
