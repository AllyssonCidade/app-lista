import { Text, StyleSheet, Image, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { PropsScreensApp } from "../routes/interfaces";
import circles from "@/assets/images/circles.png";

export const PoliticaPrivacidade = ({ navigation }: PropsScreensApp) => {
    return (
        <>
            <View style={styles.container}>
                <Image source={circles} style={styles.circles} />
                <View style={styles.header}>
                    <Feather name="arrow-left-circle" size={40} color="black" onPress={() => navigation.goBack()} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Política de Privacidade</Text>
                <Text style={styles.paragraph}>
                    Respeitamos sua privacidade e estamos comprometidos em proteger as informações pessoais que
                    você compartilha conosco. Todos os dados coletados no aplicativo de lista de tarefas são
                    utilizados exclusivamente para melhorar a sua experiência no uso do aplicativo.
                </Text>
                <Text style={styles.paragraph}>
                    Garantimos que nenhuma informação pessoal será compartilhada com terceiros sem seu consentimento
                    explícito. Para mais detalhes, por favor entre em contato com nosso suporte.
                </Text>
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8fe1d745',
        padding: 20,
        paddingBottom: 0,
        alignItems: 'center',
        gap: 40,
    }, circles: {
        position: 'absolute',
        left: -77,
        height: 243,
        width: 270,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    paragraph: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 16,
        paddingHorizontal: 20,
    }
});

export default PoliticaPrivacidade;
