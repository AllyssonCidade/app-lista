import { GestureResponderEvent, View } from "react-native";
import { Container, Divider, Text, TextDone, Title,  ViewFlexColumn, ViewFlexRow } from "./styles";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {  MaterialIcons } from "@expo/vector-icons";

interface TaskProps {
    title?: string;
    hour?: string;
    nota?: string;
    stats?: string;
    horaInicio?: string;
    horaFim?: string;
    cor?: string;
    id?: string;
    onPress?:(event: GestureResponderEvent) => void;
    onDeletTask?: () => void;
    onEditTask?: ()=> void;
    onToggleTask?: () => void;
  }

export function Task({onDeletTask,onEditTask, onToggleTask, title, cor, horaInicio, horaFim, nota, stats, onPress }: TaskProps) {
    return(
        <Container style={{backgroundColor: cor}} onPress={onPress}> 
            <ViewFlexColumn>
                <Title numberOfLines={1} >{title}</Title>
                <View style={{display: 'flex', flexDirection:'row'}}>
                    <Text>{horaInicio}</Text>
                    <Text> - </Text>
                    <Text>{horaFim}</Text>
                </View>
                <Text numberOfLines={2} >{nota}</Text>
            </ViewFlexColumn>
            <ViewFlexRow>
                <View style={{display:'flex', gap:5 }}>
                    <EvilIcons onPress={onDeletTask} name="trash" size={32} color="black" />
                    <EvilIcons onPress={onEditTask} name="pencil" size={32} color="black" />
                    <MaterialIcons onPress={onToggleTask} name="done" size={32} color="black" />
                </View>
                <Divider />
                <TextDone>{stats}</TextDone>
            </ViewFlexRow>
        </Container>
    )
}