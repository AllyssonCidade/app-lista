import { Text, StyleSheet, Image, View, TouchableOpacity  } from "react-native"
import { Buttom } from "../components/Buttom"
import { PropsScreensApp } from "../routes/interfaces"
import circles from "@/assets/images/circles.png";
import InputField from "../components/inputField";
import { useUserDatabase } from "../database/useUserDatabase";
import { useState } from "react";

export const Login= ({ navigation }:PropsScreensApp)=>{
    const { readUser } = useUserDatabase();
    const[senha, setSenha]=useState("")
    const[email, setEmail]=useState("")

    const handleLogin=  async()=>{
        try {
            await readUser(email, senha);
            console.log("logado")
        } catch (error) {
            console.log("erro:", error)
        }
    }
    return(
        <>
            <View style={styles.container}>
            <Image source={circles} style={styles.circles} />
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 50}}>Seja Bem-vindo</Text>
            <Text>Vamos ajudar a cumprir suas tarefas.</Text>
            <View style={styles.inputContainer}>
                <InputField value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" types="text" />
                <InputField value={senha} onChangeText={setSenha} placeholder="Digite sua senha" secureTextEntry types="text" />
                <Text style={styles.linkText} onPress={()=>{ navigation.navigate("RecuperarSenha")}}>Esqueceu a senha?</Text>
            </View>
            <TouchableOpacity>
            </TouchableOpacity>
            <Buttom size="xlarge" onPress={handleLogin}>Login</Buttom>
            <View style={{display:'flex', flexDirection: 'row'}}>
                <Text style={styles.p}>Não possui conta?</Text>
                <Text style={styles.linkText} onPress={()=> navigation.navigate('Cadastro')} >Cadastrar</Text>
            </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#8fe1d745',
        display: 'flex',
        flex: 1,
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
    inputContainer:{
        width: '90%',
        alignItems: 'flex-end',
    },
    linkText:{
        color: 'blue',
        marginTop: 10,
        marginBottom: 10,
    },
    p:{
        marginTop: 10,
        marginBottom: 10,
        marginRight: 5,
    }
})