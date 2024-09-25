import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Buttom } from '../components/Buttom'
import InputField from '../components/inputField'

function AtualizarDados() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 50}}>Seja Bem-vindo</Text>
      <View style={styles.inputContainer}>
              <InputField placeholder='Digite seu nome' types='text' />
              <InputField placeholder='Digite seu e-mail' types='text' />
              <InputField placeholder='Digite sua senha' types='text' />
              <InputField placeholder='Digite novamente sua senha' types='text' />
      </View>
      <View>
        <Buttom>Atualizar Dados</Buttom>
        <Buttom>Excluir Conta</Buttom>
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


export default AtualizarDados
