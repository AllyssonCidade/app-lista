import { Buttom } from '@/src/components/Buttom';
import { DateCart } from '@/src/components/DateCard';
import { Task } from '@/src/components/Task';
import React, { useContext, useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PropsScreensApp } from '../routes/interfaces';
import { usetasksDatabase } from '../database/useTasksDatabase'
import { tasksProps } from '../utils/types.module';
import { useFocusEffect } from 'expo-router';
import { AuthContext } from '../contexts/auth';
import { TasksContext } from '../contexts/tasksContext'

export const Home = ({ navigation }: PropsScreensApp) => {
  const { deletTasks } = usetasksDatabase();
  const { user } = useContext(AuthContext);
  const { toggleStats } = usetasksDatabase();
  const [data, setData] = useState("");
  const [stats, setStats] = useState("");
  const { tasks, notifications } = useContext(TasksContext);
  const { onFilter } = useContext(TasksContext);

  useFocusEffect(
    React.useCallback(() => {
      onFilter("", "");
    }, [user])
  );

  useEffect(() => {
    onFilter(data, stats)
  }, [stats, data])

  const handleDateChange = async (date: Date) => {
    try {
      const formatedDate: any = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setData(formatedDate)
    } catch (error) {
      console.log(error)
    }
  };

  const onDeletTask = async (item: any) => {
    try {
      await deletTasks(item.id)
    } catch (error) {
      console.log('erro ao deletar task')
    }
  }

  async function onCheck(item: any) {
    try {
      const novoStatus = item.stats === "Em Aberto" ? "Concluído" : "Em Aberto";
      await toggleStats({ id: item.id, stats: novoStatus });
      onFilter("", "")
    } catch (error) {
      console.log('Erro ao alternar o status da task', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFull}>
        <View style={{ paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text style={{ fontSize: 18 }}>Olá, {user?.nome}</Text>
          <View style={{ gap: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
            <View style={styles.notificationContainer}>
              <Feather onPress={() => navigation.navigate('Notificacoes')} name="bell" size={40} color="black" />
              {notifications.length > 0 &&
                <View style={styles.notificationDot} >
                  <Text style={styles.notificationText}>{notifications.length}</Text>
                </View>
              }
            </View>
            <Feather onPress={() => navigation.navigate('Settings')} name="settings" size={40} fil color="black" />
          </View>
        </View>

        <DateCart onChangeDate={handleDateChange} />
        <View style={{ paddingHorizontal: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
          <Buttom onPress={() => { setStats(""); setData(""); }} size="small">Todos</Buttom>
          <Buttom onPress={() => setStats("Em aberto")} size="small" color='white'>Em aberto</Buttom>
          <Buttom onPress={() => setStats("Concluído")} size="small" color='white'>Concluído</Buttom>
        </View>

        <Buttom size='xlarge' onPress={() =>
          navigation.navigate('AdicionarTask', {})
        } >+ Adicionar Task</Buttom>

        <FlatList style={{ width: '100%' }}
          data={tasks}
          keyExtractor={(item: tasksProps) => item.id}
          renderItem={
            ({ item }) => (
              <Task onEditTask={() => navigation.push('AdicionarTask', {
                id: item?.id || undefined,
                titulo: item?.titulo || "",
                nota: item?.nota || "",
                data: item?.data || "",
                horaInicio: item?.horaInicio || "",
                horaFim: item?.horaFim || "",
                cor: item?.cor || "",
                userId: item?.userId,
              })}
                onDeletTask={() => onDeletTask(item)} onToggleTask={() => onCheck(item)} id={item.id} stats={item.stats} cor={item.cor} nota={item.nota} title={item.titulo} horaInicio={item.horaFim} horaFim={item.horaFim} />
            )
          }
        />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#8fe1d745',
  },
  containerFull: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginBottom: 160,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    right: 2,
    top: -2,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  notificationText: {
    textAlign: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  }
})


