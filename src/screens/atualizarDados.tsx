import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Buttom } from '../components/Buttom';
import InputField from '../components/inputField';
import { AuthContext } from '../contexts/auth';
import { useUserDatabase } from '../database/useUserDatabase';
import UpdateLoading from '../components/loading/updateLoading';
import { PropsScreensApp } from '../routes/interfaces';
import { useForm, Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

function AtualizarDados({ navigation }: PropsScreensApp) {
  const { user } = useContext(AuthContext);
  const { updateUser } = useUserDatabase();
  const { deletUser } = useUserDatabase();
  const { signOut, signIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
      senha: '',
      novaSenha: '',
    },
  });

  const handleAtualize = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const { nome, email, senha, novaSenha } = data;

    try {
      let result;
      if (novaSenha.length !== 0) {
        result = await updateUser({ nome, email, senha, novaSenha, id: user?.id });
      } else {
        result = await updateUser({ nome, email, senha, id: user?.id });
      }

      await signIn(email, senha);
      setIsLoading(false);
      reset();
      console.log("resultado", result);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const id = Number(user?.id);
    try {
      await deletUser(id);
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <UpdateLoading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Feather name="arrow-left-circle" size={40} color="black" onPress={() => navigation.goBack()} />
            <Text style={styles.welcome}>Olá, {user?.nome}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20,marginTop: 40 }}>Atualize aqui os dados da sua conta</Text>
          <View style={styles.inputContainer}>

            <Controller
              control={control}
              name="nome"
              rules={{
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'O nome deve ter no mínimo 3 letras'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  titulo="Nome"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu nome"
                  types="text"
                />
              )}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Formato de e-mail inválido'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  titulo="E-mail"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu e-mail"
                  types="text"
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}


            <Controller
              control={control}
              name="senha"
              rules={{
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: 'A senha deve conter pelo menos 1 letra maiúscula e 1 número'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  secureTextEntry
                  titulo="Senha"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite sua senha"
                  types="text"
                />
              )}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

            <Controller
              control={control}
              name="novaSenha"
              rules={{
                validate: (value) => {
                  if (value.length === 0) {
                    return true;
                  } else if (value.length < 6) {
                    return 'A nova senha deve ter no mínimo 6 caracteres';
                  } else if (!/^(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
                    return 'A nova senha deve conter pelo menos 1 letra maiúscula e 1 número';
                  }
                  return true;
                }
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  secureTextEntry
                  titulo="Nova Senha"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite sua nova senha"
                  types="text"
                />
              )}
            />
            {errors.novaSenha && <Text style={styles.errorText}>{errors.novaSenha.message}</Text>}

          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            <Buttom size='large' onPress={handleSubmit(handleAtualize)}>Atualizar</Buttom>
            <Buttom size='large' color='red' onPress={handleDelete}>Excluir Conta</Buttom>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#8fe1d745',
    padding: 20,
    alignItems: 'center',
    gap: 40,
  },
  welcome: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 40,
    gap: 20,
  },
  errorText: {
    alignSelf: 'flex-start',
    marginTop: -14,
    fontSize: 14,
    color: 'red',
  },
});

export default AtualizarDados;
