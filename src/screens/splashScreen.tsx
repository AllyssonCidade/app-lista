import {  View, StyleSheet, Image, Text } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { Buttom } from "../components/Buttom";
import avatar from "@/assets/images/avatar_basic.png";
import circles from "@/assets/images/circles.png";

export const SplashScreen = ({ navigation }:PropsScreensApp)=>{
    //Tudo isso só para formatar a data :{ 
    const currentDate = new Date();
    const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${monthName} ${day}, ${year}`;

    return(
        <View style={styles.container}>
            <Image source={circles} style={styles.circles} />
            <Text style={styles.data}>{formattedDate}</Text>
            <View style={styles.main}>
                <View style={styles.shadowContainer}>
                    <Image source={avatar} style={styles.image} />
                </View>
            <Text style={styles.h1} >Organize suas tarefas com facilidade!</Text>
            <Text style={styles.h2}>Transforme sua rotina com uma gestão de tarefas prática e eficiente. Planeje, acompanhe e conclua suas atividades diárias sem complicação.</Text>
            </View>
            <View style={styles.buttom}>
                <Buttom size="xlarge" onPress={()=> navigation.navigate('Login')} >Começar agora</Buttom>
            </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#8fe1d745',
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    image:{
        height: 270,
        width: 270,
    },
    circles:{
        left: -137,
        height: 243,
        width: 270,
    },
    shadowContainer: {
        shadowColor: '#000',        
        elevation: 10, 
        borderRadius: 120, 
      },    
    main:{
        flex: 1,
        top: -80,
        display: 'flex',
        gap: 20,
        alignItems: 'center',
    },
    buttom:{
        marginBottom: 50,
    },
    h1:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2:{
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        width: 200,
        letterSpacing: 0.2,
    },
    data:{
        fontSize: 16,
        textAlign: 'left',
        top: 40,
        left: 20,
        position: 'absolute',
    }
})
