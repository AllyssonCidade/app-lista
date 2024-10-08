import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { PropsStackRoutes } from '../routes/interfaces';
import { Feather } from '@expo/vector-icons';
import InputField from '../components/inputField/index'
import { Buttom } from '../components/Buttom';
import { useForm, Controller } from "react-hook-form"
import { usetasksDatabase } from '../database/useTasksDatabase'
import { AuthContext } from '../contexts/auth';

const AdicionarTask = ({ navigation, route }: PropsStackRoutes | any) => {
  const { titulo, id, nota, data, horaInicio, horaFim, cor }: any = route.params || undefined;
  const { updateTask } = usetasksDatabase();
  const { createTask } = usetasksDatabase();
  const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  async function onSubmit(data: any) {
    try {
      if (route.params?.id) {
        const response = await updateTask({ ...data, id: route.params.id });
        navigation.navigate('Home');
      } else {
        const response = await createTask(data);
        Alert.alert("Task cadastrada com o ID: " + response.insertedRowId);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title} >
          Adicionar Tarefa</Text>
        <Feather style={{ alignSelf: 'flex-start' }} name="arrow-left-circle" size={40} color="black" onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.form}>

        <Controller
          control={control}
          defaultValue={route.params ? titulo : ""}
          rules={{
            maxLength: 40,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField types='text' onBlur={onBlur} onChangeText={value => onChange(value)} value={value} titulo={"Titulo"} placeholder={'Digite o título'}>{titulo}</InputField>
          )}
          name="titulo"
        />
        {errors.titulo && <Text style={styles.erro}>O titulo deve ter entre 1 e 40 caracters</Text>}

        <Controller
          control={control}
          name="nota"
          defaultValue={route.params ? nota : ""}
          rules={{
            maxLength: 40,
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField types='text' titulo={"Nota"} placeholder={'Digite a tarefa'} onChangeText={onChange} value={value}>{nota}</InputField>
          )}
        />
        {errors.nota && <Text style={styles.erro}>A tarefa deve ter entre 1 e 40 caracters</Text>}
        <Controller
          control={control}
          defaultValue={route.params ? route.params.data : ""}
          name="data"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField types='date' titulo={"Data"} placeholder={'Informe a data'} onChangeText={onChange} value={value}>{data}</InputField>
          )}
        />
        {errors.data && <Text style={styles.erro}>Informe uma data.</Text>}

        <View style={styles.time}>
          <Controller
            control={control}
            defaultValue={route.params ? horaInicio : ""}
            name="horaInicio"
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField types="time" titulo={"Hora de Início"} placeholder={'00:00'} onChangeText={onChange} value={value} />
            )}
          />
          {errors.horaInicio && <Text style={styles.erro}>Digite uma hora de início.</Text>}

          <Controller
            control={control}
            name="horaFim"
            defaultValue={route.params ? horaFim : ""}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField types='time' titulo={"Hora de Fim"} placeholder={'00:00'} onChangeText={onChange} value={value} />
            )}
          />
          {errors.horaFim && <Text style={styles.erro}>Digite uma hora de fim.</Text>}
        </View>
      </View>

      <View style={styles.time}>
        <View style={styles.section}>
          <Controller
            control={control}
            name="cor"
            defaultValue={'blue'}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.section}>
                {['blue', 'red', 'orange'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: color,
                        borderWidth: value === color ? 2 : 0,
                      },
                    ]}
                    onPress={() => onChange(color)}
                  >
                    {value === color && (
                      <Feather name="check" size={25} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {errors.cor && <Text style={styles.erro}>Selecione um campo.</Text>}

        </View>

        <Buttom title="Submit" onPress={(handleSubmit(onSubmit))}>{route.params.id ? "Editar Tarefa" : "Criar tarefa"}</Buttom>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fe1d745',
    padding: 20,
    alignItems: 'center',
    gap: 40,
  },
  header: {
    display: 'flex',
    width: '100%',
  },
  checkbox: {
    borderRadius: 20,
    margin: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    display: 'flex',
    gap: 20,
  },
  time: {
    justifyContent: 'space-between',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  erro: {
    marginTop: -15,
    color: 'red',
    fontWeight: 'light',
  },
  section: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
})

export default AdicionarTask;