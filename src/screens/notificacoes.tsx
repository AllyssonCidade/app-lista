import React, { useContext } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import circles from "@/assets/images/circles.png";

import { PropsScreensApp } from '../routes/interfaces';
import { useFocusEffect } from 'expo-router';
import { TasksContext } from '../contexts/tasksContext'
import { Task } from '../components/Task';
import { usetasksDatabase } from '../database/useTasksDatabase';
import { tasksProps } from '../utils/types.module';


export const Notificacoes = ({ navigation }: PropsScreensApp) => {
  const { notifications } = useContext(TasksContext);
  const { toggleStats } = usetasksDatabase();
  const notificationArray = Array.isArray(notifications) ? notifications : [notifications];
  const { onFilter }= useContext(TasksContext); 

  useFocusEffect(
    React.useCallback(() => {
    }, [])
  );

  async function onCheck(item: any) {
    try {
      const novoStatus = item.stats === "Em Aberto" ? "Concluído" : "Em Aberto";
      await toggleStats({ id: item.id, stats: novoStatus });
      onFilter("","")
    } catch (error) {
      console.log('Erro ao alternar o status da task', error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={circles} style={styles.circles} />
      <View style={styles.header}>
        <Feather name="arrow-left-circle" size={40} color="black" onPress={() => navigation.goBack()} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Notificações</Text>
      <FlatList style={{width: '100%'}}
        data={notificationArray}
        keyExtractor={(item: tasksProps) => item.id}
        renderItem={({ item }) => (
          <>
          <Text style={styles.p}>Tarefa vencida em: {item.data}</Text>
          <Task onToggleTask={() => onCheck(item)}
            id={item.id}
            stats={item.stats}
            cor={item.cor}
            nota={item.nota}
            title={item.titulo}
            horaInicio={item.horaFim}
            horaFim={item.horaFim}
            />
      </>
        )} ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Você não tem notificações no momento</Text>
          </View>
        }
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fe1d745',
    padding: 20,
    paddingBottom: 0,
    alignItems: 'center',
    gap: 40,
  },
  circles: {
    position: 'absolute',
    left: -77,
    height: 243,
    width: 270,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  p:{
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'semibold',
  }, 
  notificationItem:{
    marginBottom: 10,
  },

});
