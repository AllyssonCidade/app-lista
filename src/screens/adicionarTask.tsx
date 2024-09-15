  import React, { Children, useState, useContext, useEffect } from 'react';
  import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity  } from 'react-native';
  import { PropsScreensApp } from '../routes/interfaces';
  import { Feather } from '@expo/vector-icons';
  import InputField, { InputFieldProps } from '../components/inputField/index'
  import { Buttom } from '../components/Buttom';
  import { useForm, Controller } from "react-hook-form"
  import { usetasksDatabase } from '../database/useTasksDatabase'

  interface TaskParams {
    id?: number;
    titulo?: string;
    nota?: string;
    data?: string;
    horaInicio?: string;
    horaFim?: string;
    repetir?: string;
    cor?: string;
  }
  
  const AdicionarTask = ({ navigation, route }:PropsScreensApp) => {
    const {titulo, id, nota, data, horaInicio, horaFim, repetir, cor}:any = route.params || undefined ;

    const { updateTask } = usetasksDatabase();
    const { createTask } = usetasksDatabase();

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
    

  return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} >
            Adicionar Tarefa</Text>
          <Feather style={{alignSelf: 'flex-start'}} name="arrow-left-circle" size={40} color="black" onPress={()=> navigation.goBack() } />
        </View>

        <View style={styles.form}>

          <Controller
          control={control}
          defaultValue={route.params? titulo: ""}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField types='text' onBlur={onBlur} onChangeText={value => onChange(value)} value={value} titulo={"Titulo"} placeholder={'Digite o título'}>{titulo}</InputField>
          )}
          name="titulo"
        />
        {errors.titulo && <Text>Digite um titulo.</Text>}

        <Controller
          control={control}
          name="nota"
          defaultValue={route.params? nota: ""}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField types='text' titulo={"Nota"} placeholder={'Digite a tarefa'} onChangeText={onChange} value={value}>{nota}</InputField>
          )}
        />
        {errors.nota && <Text>Digite sua tarefa.</Text>}
        <Controller
          control={control}
          defaultValue={route.params? route.params.data: ""}
          name="data"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value} }) => (
            <InputField types='date' titulo={"Data"} placeholder={'Informe a data'} onChangeText={onChange} value={value}>{data}</InputField>
          )}
        />
        {errors.data && <Text>Informe uma data.</Text>}

        <View style={styles.time}>
           <Controller
            control={control}
            defaultValue={route.params? horaInicio: ""}
            name="horaInicio"
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField types="time" titulo={"Hora de Início"} placeholder={'00:00'} onChangeText={onChange} value={value}/>
            )}
          />
          {errors.horaInicio && <Text>Digite uma hora de início.</Text>}

          <Controller
            control={control}
            name="horaFim"
            defaultValue={route.params? horaFim: ""}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField types='time' titulo={"Hora de Fim"} placeholder={'00:00'} onChangeText={onChange} value={value}/>
            )}
            />
            {errors.horaFim && <Text>Digite uma hora de fim.</Text>}
        </View>

        <Controller
          control={control}
          name="repetir"
          defaultValue={route.params? horaFim: "Não"}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <InputField
            types='select'
            titulo={"Repetir"}
            placeholder={'Nenhum'}
            onChangeText={onChange} 
            value={value} 
            options={[
              { label: 'Nenhum', value: 'Nenhum' },
              { label: 'Sim', value: 'Sim' },
              { label: 'Não', value: 'Não' }
            ]}
            />
          )}
          />

        </View>
          {errors.repetir && <Text>Selecione um campo.</Text>}

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
          {errors.cor && <Text>Selecione um campo.</Text>}

          </View>
           
          <Buttom title="Submit" onPress={(handleSubmit(onSubmit))} >Criar tarefa</Buttom>
        </View> 
      </View>
  );

}

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#8fe1d781',
      padding: 20,
      alignItems: 'center',
      gap: 40,
    },
    header:{
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
    title:{
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    form:{
      width: '100%',
      display: 'flex',
      gap: 20,
    },  
    time:{
      justifyContent: 'space-between',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
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