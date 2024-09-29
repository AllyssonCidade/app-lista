import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Buttom } from '../components/Buttom'
import InputField from '../components/inputField'
import { AuthContext } from '../contexts/auth';
import { useUserDatabase } from '../database/useUserDatabase';
import UpdateLoading from '../components/loading/updateLoading';
import { PropsScreensApp } from '../routes/interfaces';

function AtualizarDados({navigation}:PropsScreensApp) {
  const { user } = useContext(AuthContext); 
  const { updateUser } = useUserDatabase();
  const { deletUser } = useUserDatabase();
  const [nome, setNome] = useState(user?.nome || ''); 
  const [email, setEmail] = useState(user?.email || '');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const { signOut } = useContext(AuthContext); 
  const { signIn } = useContext(AuthContext); 

  const handleAtualize = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    try{
      const result = await updateUser({ nome, email, senha, novaSenha, id: user?.id });
      await signIn(email, senha);
      setIsLoading(false);
      setSenha("");
      setNovaSenha("");
    }catch(error){
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  const handleDelete = async () => {
    const id = Number(user?.id)
    try {
      deletUser(id);
      signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {isLoading ? (
      <UpdateLoading /> 
    ) : (
      <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Seja Bem-vindo</Text>
      <View style={styles.inputContainer}>
        <InputField
          titulo='Nome'
          onChangeText={setNome} 
          value={nome} 
          placeholder='Digite seu nome'
          types='text'
          />
        <InputField
          titulo='E-mail'
          onChangeText={setEmail} 
          value={email} 
          placeholder='Digite seu e-mail'
          types='text'
          />
        <InputField
          secureTextEntry
          titulo='Senha'
          onChangeText={setSenha} 
          value={senha} 
          placeholder='Digite sua senha'
          types='text'
          />
        <InputField
          secureTextEntry
          titulo='Nova Senha'
          onChangeText={setNovaSenha}
          value={novaSenha} 
          placeholder='Digite sua nova senha'
          types='text'
          />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <Buttom onPress={handleAtualize}>Atualizar</Buttom>
        <Buttom onPress={handleDelete}>Excluir Conta</Buttom>
      </View>
    </View>
    )}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#8fe1d745',
    display: 'flex',
    flex: 1,
    paddingTop: 40,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 40,
    gap: 20,
  },
});

export default AtualizarDados;
