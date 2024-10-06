import React, { useState } from 'react';
import { PropsScreensApp } from '../routes/interfaces';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputField from '../components/inputField';
import circles from "@/assets/images/circles.png";
import { useUserDatabase } from '../database/useUserDatabase';
import * as Clipboard from 'expo-clipboard';
import { Buttom } from '../components/Buttom';
import LoadingScreen from '../components/loading/loginLoading';

function RecuperarSenha({ navigation }: PropsScreensApp) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const { recuperaSenha } = useUserDatabase();
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await recuperaSenha({ email, nome });
      if (response) {
        setSenha(response);
      } else {
        setErrorMessage("Nome ou e-mail não encontrados.")
      }
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      setErrorMessage("Ocorreu um erro. Verifique se o usuário e nome estão corretos.")
    }
    setIsLoading(false);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(senha);
    Alert.alert('Senha copiada!', 'A senha foi copiada para sua área de transferência.');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Image source={circles} style={styles.circles} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Recuperar Senha</Text>

          {senha ? (
            <View style={styles.senhaContainer}>
              <Text style={styles.senhaTexto}>Sua nova senha é:</Text>
              <Text style={styles.senha}>{senha}</Text>

              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Text style={styles.copyButtonText}>Copiar Senha</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <InputField value={email} onChangeText={setEmail} titulo='E-mail' placeholder='Digite seu e-mail' types='text' />
              <InputField value={nome} onChangeText={setNome} titulo='Nome' placeholder='Digite seu nome' types='text' />
              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
              <Buttom size="xlarge" onPress={handleSubmit}>Enviar</Buttom>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#8fe1d745',

    display: 'flex',
    flex: 1,
  },
  image: {
    height: 270,
    width: 270,
  },
  circles: {
    left: -137,
    height: 243,
    width: 270,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
    gap: 30,
  },
  senhaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  senhaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  senha: {
    fontSize: 24,
    color: '#f00',
    fontWeight: 'bold',
  },
  copyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default RecuperarSenha;
