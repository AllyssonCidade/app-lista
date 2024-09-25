import { Buttom } from '@/src/components/Buttom';
import { Task } from '@/src/components/Task';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PropsScreensApp } from '../routes/interfaces';
import { useFocusEffect } from 'expo-router';

const notificationsMock = [
  { id: '1', titulo: 'Lembrete de Tarefa', nota: 'Você tem uma tarefa pendente.', cor: 'red' },
  { id: '2', titulo: 'Tarefa Finalizada', nota: 'A tarefa "Revisar Código" foi concluída.', cor: 'red' },
];

export const Notificacoes = ({ navigation }: PropsScreensApp) => {
  const [notifications, setNotifications] = useState<any[]>(notificationsMock);

  useFocusEffect(
    React.useCallback(() => {
      // Aqui você pode atualizar as notificações, se necessário.
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificações</Text>
        <Feather onPress={() => navigation.navigate('Settings')} name="settings" size={30} color="black" />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task 
            onEditTask={() => { /* lógica para editar notificação */ }}
            onDeletTask={() => { /* lógica para deletar notificação */ }}
            id={item.id} 
            stats={item.cor === 'red' ? 'Concluído' : 'Em andamento'} 
            cor={item.cor} 
            nota={item.nota} 
            title={item.titulo} 
            horaInicio="" 
            horaFim="" 
          />
        )}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#8fe1d745',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationList: {
    paddingBottom: 50,
  },
});
