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
  const { deletTasks } = usetasksDatabase();
  const { filterTask } = usetasksDatabase();  

  useFocusEffect(
    React.useCallback(() => {
      onFilter("");
    }, [])
  );
  
  const handleDateChange = async(date: Date) => {
    try {
      const formatedDate:any = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const response = await filterTask(formatedDate)
      setTasks( response);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  const onDeletTask = async(item:any) =>{
    try {
      await deletTasks(item.id)
      onFilter("")
    } catch (error) {
      console.log('erro ao deletar task')
    }
  }

  const onFilter = async(data:string)=>{
    try {
      const response = await filterTask(data)
      setTasks(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFull}>
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text style={{fontSize: 18}}>Olá, Ryan</Text>
          <View style={{gap: 20, flexDirection: 'row', justifyContent: 'space-between'}} >
            <Feather onPress={()=> navigation.navigate('Notificacoes')} name="bell" size={40} color="black" />
            <Feather onPress={()=> navigation.navigate('Settings')} name="settings" size={40} fil color="black" />
          </View>
        </View>

        <DateCart onChangeDate={handleDateChange}/>
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Buttom onPress={()=> onFilter("")} size="small">Todos</Buttom>
          <Buttom onPress={()=>onFilter("orange")} size="small" color='white'>Em aberto</Buttom>
          <Buttom onPress={()=>onFilter("red")} size="small" color='white'>Finalizado</Buttom>
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
          
        />


      </View> 
    
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 20,
    paddingBottom: 170,
    backgroundColor: '#8fe1d745',
  },

  containerFull:{
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
})

