import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RouteProps = {
    id?: string;
    titulo?: string;
    nota?: string;
    data?: string;
    horaInicio?: string;
    horaFim?: string;
    repetir?: string;
    cor?: string;
    route?: any;
};

export type PropsStackRoutes = {
    AdicionarTask: undefined | RouteProps;
    Home: undefined | RouteProps;
    SplashScreen: undefined | RouteProps;
    Login: undefined | RouteProps;
    AtualizarDados: undefined | RouteProps;
    Cadastro: undefined | RouteProps;
    RecuperarSenha: undefined | RouteProps;
    Notificacoes: undefined | RouteProps;
    PoliticaDePrivacidade: undefined | RouteProps;
    Sobre: undefined | RouteProps;
    Settings: undefined | RouteProps;
};

export type PropsScreensApp = NativeStackScreenProps<PropsStackRoutes>;
