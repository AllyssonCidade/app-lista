import React from 'react'
import { Buttom } from '../components/Buttom'
import { PropsScreensApp } from '../routes/interfaces'
import { Image, Text, View, StyleSheet} from 'react-native'
import InputField from '../components/inputField'
import circles from "@/assets/images/circles.png";

function RecuperarSenha({navigation}:PropsScreensApp) {
  return (
    <View style={styles.container}>
      <Image source={circles} style={styles.circles} />
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 50}}>Seja Bem-vindo</Text>
            <Text>Digite o e-mail cadastrado</Text>
            <View style={styles.inputContainer}>
              <InputField placeholder='Digite seu e-mail' types='text' />
            </View>
            <Buttom size="xlarge" onPress={()=> navigation.navigate('Login')}>Enviar</Buttom>
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

export default RecuperarSenha
