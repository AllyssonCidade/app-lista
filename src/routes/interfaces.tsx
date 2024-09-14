import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PropsStackRoutes = {
    AdicionarTask: undefined | {
        id?: string;
        titulo?: string;
        nota?: string;
        data?: string;
        horaInicio?: string;
        horaFim?: string;
        repetir?: string;
        cor?: string;
      };
    Home: undefined;
}

export type PropsScreensApp = NativeStackScreenProps<PropsStackRoutes>