import React from 'react'
import { Button, Image, Text, View, StyleSheet } from 'react-native'
import { PropsScreensApp } from '../routes/interfaces'
import circles from "@/assets/images/circles.png";
import { Buttom } from '../components/Buttom';
import InputField from '../components/inputField';

export default function Cadastro({navigation}:PropsScreensApp) {
  return (
    <View style={styles.container}>
      <Image source={circles} style={styles.circles} />
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 50}}>Seja Bem-vindo</Text>
            <Text>Vamos ajudar a cumprir suas tarefas.</Text>
            <View style={styles.inputContainer}>
              <InputField placeholder='Digite seu nome' types='text' />
              <InputField placeholder='Digite seu e-mail' types='text' />
              <InputField placeholder='Digite sua senha' types='text' />
              <InputField placeholder='Digite novamente sua senha' types='text' />
            </View>
            <Buttom size="xlarge" onPress={()=> navigation.navigate('Login')}>Cadastrar</Buttom>
            <View style={{display:'flex', flexDirection: 'row'}}>
                <Text style={styles.p}>Já possui conta?</Text>
                <Text style={styles.linkText} onPress={()=> navigation.navigate('Login')} >Entrar</Text>
            </View>

    </View>
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
    marginBottom: 40,
    gap: 0,
  },
  linkText:{
    color: 'blue',
    marginTop: 10,
  },
  p:{
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
  },
})
