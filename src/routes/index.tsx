import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsStackRoutes } from './interfaces';
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
import { AppStack } from './appStack';
import { AuthStack } from './authStack';

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigation = () => {
  const authData = true;
  return (
    <>
      <StatusBar hidden barStyle={'dark-content'} backgroundColor="#8fe1d745" />
        <>
          {authData ? <AppStack /> : <AuthStack />}
        </>
    </>
  );
};

export default AppNavigation;
