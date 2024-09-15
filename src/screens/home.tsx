import { Buttom } from '@/src/components/Buttom';
import { DateCart } from '@/src/components/DateCard';
import { Task } from '@/src/components/Task';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PropsScreensApp } from '../routes/interfaces';
import { usetasksDatabase } from '../database/useTasksDatabase'
import { tasksProps } from '../utils/types';
import { useFocusEffect } from 'expo-router';

export const Home = ({ navigation }:PropsScreensApp) => {
  const [tasks, setTasks] = useState<any>([]);
  const [search, setSearch] = useState("");
  const { getTasks } = usetasksDatabase();
  const { deletTasks } = usetasksDatabase();

  const searchTasks= async()=>{
    try {
      const response = await getTasks(search)
      setTasks(response)
    } catch (error) {
      
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      searchTasks();
    }, [search])
  );
  
  const onDeletTask = async(item:any) =>{
    try {
      await deletTasks(item.id)
      searchTasks()
    } catch (error) {
      console.log('erro ao deletar task')
    }
  }

  const onEditTask = async(item: any) =>{

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFull}>
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text style={{fontSize: 18}}>Olá, Ryan</Text>
          <View style={{gap: 20, flexDirection: 'row', justifyContent: 'space-between'}} >
            <Feather name="bell" size={40} color="black" />
            <Feather name="settings" size={40} fil color="black" />
          </View>
        </View>

        <DateCart />
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Buttom size="small">Todos</Buttom>
          <Buttom size="small" color='white'>Em aberto</Buttom>
          <Buttom size="small" color='white'>Finalizado</Buttom>
        </View>  

        <Buttom size='xlarge' onPress={()=>
          navigation.navigate('AdicionarTask', {})
        } >+ Adicionar Task</Buttom>

        <FlatList style={{width: '100%'}}
          data={tasks}
          keyExtractor={(item: tasksProps) => item.id}
          renderItem={
            ({item}) =>(
              <Task onEditTask={()=>navigation.push('AdicionarTask', {
                id: item?.id || undefined, 
                titulo: item?.titulo || "",
                nota: item?.nota || "",
                data: item?.data || "" ,
                horaInicio: item?.horaInicio || "" ,
                horaFim: item?.horaFim || "" ,
                repetir: item?.repetir || "" ,
                cor: item?.cor || "" ,
                
      })}
      onDeletTask={()=> onDeletTask(item)} id={item.id} stats={item.cor === 'red' ? 'Concluido' : 'Em andamento'} cor={item.cor} nota={item.nota} title={item.titulo} horaInicio={item.horaFim} horaFim={item.horaFim} />
    )
          }
          ListEmptyComponent={() =>(
              <Task nota='Sua tarefa fica aqui' title='Titulo da Tarefa' hour='00:00' stats='Concluido'/>
          )}
        />

      </View> 
    
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#8fe1d781',
  },

  containerFull:{
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
})

