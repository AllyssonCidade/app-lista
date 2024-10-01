import { Text, StyleSheet, Image, View } from "react-native";
import { Buttom } from "../components/Buttom";
import { PropsScreensApp } from "../routes/interfaces";
import circles from "@/assets/images/circles.png";
import InputField from "../components/inputField";
import { useContext, useState } from "react";
import { AuthContext } from '../contexts/auth';
import LoadingScreen from "../components/loading/loginLoading";
import { useForm, Controller } from "react-hook-form";

interface FormData {
    email: string;
    senha: string;
}

export const Login = ({ navigation }: PropsScreensApp) => {
    const { signIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleLogin = async (data: FormData) => {
        setIsLoading(true);
        try {
            const result = await signIn(data.email, data.senha);
            setIsLoading(false);
        } catch (error) {
            console.log("erro:", error);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <Image source={circles} style={styles.circles} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Seja Bem-vindo</Text>
                    <Text>Vamos ajudar a cumprir suas tarefas.</Text>
                    <View style={styles.inputContainer}>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'E-mail é obrigatório',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'E-mail inválido'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Digite seu e-mail"
                                    types="text"
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                        <Controller
                            control={control}
                            name="senha"
                            rules={{
                                required: 'Senha é obrigatória',
                                minLength: {
                                    value: 6,
                                    message: 'A senha deve ter no mínimo 6 caracteres'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Digite sua senha"
                                    secureTextEntry
                                    types="text"
                                />
                            )}
                        />
                        {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

                        <Text style={styles.linkText} onPress={() => { navigation.navigate("RecuperarSenha") }}>
                            Esqueceu a senha?
                        </Text>
                    </View>
                    <Buttom size="xlarge" onPress={handleSubmit(handleLogin)}>Login</Buttom>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.p}>Não possui conta?</Text>
                        <Text style={styles.linkText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#8fe1d745',
        flex: 1,
    },
    circles: {
        left: -137,
        height: 243,
        width: 270,
    },
    inputContainer: {
        width: '90%',
        alignItems: 'flex-end',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    linkText: {
        color: 'blue',
        marginTop: 10,
        marginBottom: 10,
    },
    p: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 5,
    }
});
