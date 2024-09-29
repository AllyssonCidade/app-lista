import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator} from 'react-native'
import { Buttom } from '../Buttom'
import InputField from '../inputField'

function UpdateLoading() {
  return (
    <>
    <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
    <View style={styles.container}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Seja Bem-vindo</Text>
    <View style={styles.inputContainer}>
      <InputField
        titulo='Nome'
        placeholder='Digite seu nome'
        types='text'
        />
      <InputField
        titulo='E-mail'
        placeholder='Digite seu e-mail'
        types='text'
        />
      <InputField
        titulo='Senha'
        placeholder='Digite sua senha'
        types='text'
        />
      <InputField
        titulo='Senha'
        placeholder='Digite sua nova senha'
        types='text'
        />
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
      <Buttom >Atualizar</Buttom>
      <Buttom>Excluir Conta</Buttom>
    </View>
  </View>
</>
  )
}const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#8fe1d745',
      display: 'flex',
      flex: 1,
      paddingTop: 40,
    },
    spinner:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#e2e2e25e',
        zIndex: 2,
    },
    inputContainer: {
      width: '90%',
      alignItems: 'flex-end',
      marginBottom: 40,
      gap: 20,
    },
  });
  
export default UpdateLoading
