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
        route?:any;
      };
    Home: undefined | {
      id?: string;
      titulo?: string;
      nota?: string;
      data?: string;
      horaInicio?: string;
      horaFim?: string;
      repetir?: string;
      cor?: string;
    };
}

export type PropsScreensApp = NativeStackScreenProps<PropsStackRoutes>