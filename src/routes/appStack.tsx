import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsStackRoutes } from './interfaces';
import { SplashScreen } from '../screens/splashScreen';
import { Login } from '../screens/login';
import Cadastro from '../screens/cadastro';
import RecuperarSenha from '../screens/recuperarSenha';

const Stack = createNativeStackNavigator<PropsStackRoutes>();

export function AppStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}