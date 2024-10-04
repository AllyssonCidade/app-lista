import React from 'react';
import { Image, Text, View, StyleSheet, Alert } from 'react-native';
import { PropsScreensApp } from '../routes/interfaces';
import circles from "@/assets/images/circles.png";
import { Buttom } from '../components/Buttom';
import InputField from '../components/inputField';
import { useUserDatabase } from '../database/useUserDatabase';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  email: string;
  nome: string;
  senha: string;
  confirmSenha: string;
}

export default function Cadastro({ navigation }: PropsScreensApp) {
  const { createUser } = useUserDatabase();

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    defaultValues: {
      email: '',
      nome: '',
      senha: '',
      confirmSenha: ''
    }
  });

  const onCreatUser = async (data: FormData) => {
    const { nome, email, senha } = data;
    
    try {
      await createUser({ nome, email, senha });
      Alert.alert("Cadastro realizado com sucesso!!!");
      navigation.navigate('Login');
    } catch (error:any) {
      if (error.message === "Email já cadastrado") {
        Alert.alert("Erro", "Email já está cadastrado!");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao cadastrar o usuário.");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={circles} style={styles.circles} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Seja Bem-vindo</Text>
      <Text>Vamos ajudar a cumprir suas tarefas.</Text>
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
              onChangeText={onChange}
              value={value}
              placeholder='Digite seu nome'
              types='text'
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'E-mail inválido'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              onChangeText={onChange}
              value={value}
              placeholder='Digite seu e-mail'
              types='text'
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
            validate: {
              hasUpperCase: (value) => /[A-Z]/.test(value) || 'A senha deve conter pelo menos 1 letra maiúscula',
              hasNumber: (value) => /\d/.test(value) || 'A senha deve conter pelo menos 1 número'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholder='Digite sua senha'
              types='text'
            />
          )}
        />
        {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

        <Controller
          control={control}
          name="confirmSenha"
          rules={{
            required: 'Confirmação de senha é obrigatória',
            validate: (value) => value === getValues('senha') || 'As senhas não coincidem'
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholder='Digite novamente sua senha'
              types='text'
            />
          )}
        />
        {errors.confirmSenha && <Text style={styles.errorText}>{errors.confirmSenha.message}</Text>}
      </View>
      <Buttom size="xlarge" onPress={handleSubmit(onCreatUser)}>Cadastrar</Buttom>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.p}>Já possui conta?</Text>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Entrar</Text>
      </View>
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
  circles: {
    left: -137,
    height: 243,
    width: 270,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 40,
    gap: 0,
  },
  errorText: {
    color: 'red',
    marginBottom: -19,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: 'blue',
    marginTop: 10,
  },
  p: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
  },
});
