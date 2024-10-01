import { Text, StyleSheet, Image, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { PropsScreensApp } from "../routes/interfaces";
import circles from "@/assets/images/circles.png";

export const Sobre = ({ navigation }: PropsScreensApp) => {
    return (
        <>
            <View style={styles.container}>
                <Image source={circles} style={styles.circles} />
                <View style={styles.header}>
                    <Feather name="arrow-left-circle" size={40} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.title}>Sobre o Aplicativo</Text>
                </View>
                <Text style={styles.paragraph}>
                    Este aplicativo de lista de tarefas foi desenvolvido para ajudar você a organizar suas 
                    atividades diárias de forma simples e eficiente. Nosso objetivo é proporcionar uma 
                    experiência leve, sem complicações, para que você possa focar no que realmente importa: 
                    cumprir suas tarefas!
                </Text>
                <Text style={styles.paragraph}>
                    Com funcionalidades intuitivas, você poderá adicionar, editar e excluir tarefas, além de 
                    marcar aquelas que já foram concluídas.
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8fe1d745',
    },
    circles: {
        position: 'absolute',
        left: -137,
        height: 243,
        width: 270,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 50,
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

export default Sobre;
