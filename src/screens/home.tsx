import { Buttom } from '@/src/components/Buttom';
import { DateCart } from '@/src/components/DateCard';
import { Task } from '@/src/components/Task';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ModalAddTask from '../components/ModalAddTask'
import { PropsScreensApp } from '../routes/interfaces';


export const Home = ({ navigation }:PropsScreensApp) => {
  const[tasks, setTasks] = useState<({description: string; check: boolean}[])>([]);
  const[taskText, setTaskText]= useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal(){
    setModalVisible(!isModalVisible);
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
          navigation.navigate('AdicionarTask')
        } >+ Adicionar Task</Buttom>

        <FlatList style={{width: '100%'}}
          data={tasks}
          keyExtractor={(item, index)=> index.toString()}
          renderItem={
            ({item}) =>(
              <Task title='Tarefa' onPress={toggleModal} />
            )
          }
          ListEmptyComponent={() =>(
              <Task task='Teste' onPress={toggleModal} title='Trabalho' hour='09:00' stats='Concluido'/>
          )}
        />

      </View> 
      {isModalVisible && <ModalAddTask />}
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

