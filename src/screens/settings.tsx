import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PropsScreensApp } from '../routes/interfaces'
import { Buttom } from '../components/Buttom'

function Settings({navigation}:PropsScreensApp) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather  name="arrow-left-circle" size={40} color="black" onPress={()=> navigation.goBack() } />
        <Text style={styles.welcome}>Olá, Ryan</Text>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 50}}>Configurações</Text>
      <Buttom size='xlarge' onPress={()=> navigation.navigate('Notificacoes')}>Notificações</Buttom>
      <Buttom size='xlarge' onPress={()=> navigation.navigate('AtualizarDados')} >Editar dados</Buttom>
      <Buttom size='xlarge' onPress={()=> navigation.navigate('Sobre')}>Sobre</Buttom>
      <Buttom size='xlarge' onPress={()=> navigation.navigate('PoliticaDePrivacidade')}>Política de privacidade</Buttom>
      <Buttom onPress={()=> navigation.navigate('SplashScreen')} style={styles.logout} size='medium'>Logout</Buttom>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#8fe1d745',
    padding: 20,
    alignItems: 'center',
    gap: 40,
  },
  welcome:{
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logout:{
    position: 'absolute',
    bottom: 50,
    right: 50,
  }
})
export default Settings
