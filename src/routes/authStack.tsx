import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsStackRoutes } from './interfaces';
import { Home } from '../screens/home';
import AtualizarDados from '../screens/atualizarDados';
import Settings from '../screens/settings';
import AdicionarTask from '../screens/adicionarTask';
import { Notificacoes } from '../screens/notificacoes';
import PoliticaPrivacidade from '../screens/politicaDePrivacidade';
import Sobre from '../screens/sobre';


const Stack = createNativeStackNavigator<PropsStackRoutes>();

export function AuthStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="AtualizarDados" component={AtualizarDados} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
            <Stack.Screen name="AdicionarTask" component={AdicionarTask} options={{ headerShown: false }} />
            <Stack.Screen name="Notificacoes" component={Notificacoes} options={{ headerShown: false }} />
            <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }} />
            <Stack.Screen name="PoliticaDePrivacidade" component={PoliticaPrivacidade} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}