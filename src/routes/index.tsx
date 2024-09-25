import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsStackRoutes } from './interfaces';
import AuthProvider from '@/src/contexts/authContext'
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../database/initializeDatabase';
import { StatusBar } from 'react-native';
import { SplashScreen } from '../screens/splashScreen';
import { Login } from '../screens/login';
import { Home } from '../screens/home';
import AdicionarTask from '../screens/adicionarTask';
import Settings from '../screens/settings';
import RecuperarSenha from '../screens/recuperarSenha';
import AtualizarDados from '../screens/atualizarDados';
import Cadastro from '../screens/cadastro';
import Sobre from '../screens/sobre';
import PoliticaPrivacidade from '../screens/politicaDePrivacidade';
import { Notificacoes } from '../screens/notificacoes';

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigation = () => {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
      <StatusBar hidden barStyle={'dark-content'} backgroundColor="#8fe1d745" />
        <Stack.Navigator >
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="AtualizarDados" component={AtualizarDados} options={{ headerShown: false }}/>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: false }}/>
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
          <Stack.Screen name="AdicionarTask" component={AdicionarTask} options={{ headerShown: false }} />
          <Stack.Screen name="Notificacoes" component={Notificacoes} options={{ headerShown: false }} />
          <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }} />
          <Stack.Screen name="PoliticaDePrivacidade" component={PoliticaPrivacidade} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AuthProvider>
    </SQLiteProvider>
  );
};

export default AppNavigation;
