import { GestureResponderEvent } from "react-native";
import { Container, Divider, Text, TextDone, Title, ViewFlexColumn, ViewFlexRow } from "./styles";

interface TaskProps {
    title?: string;
    hour?: string;
    task?: string;
    stats?: string;
    onPress?: (event: GestureResponderEvent) => void;
  }

export function Task({title, hour, task, stats, onPress }: TaskProps) {
    return(
        <Container onPress={onPress}> 
            <ViewFlexColumn>
                <Title >{title}</Title>
                <Text>{hour}</Text>
                <Text>{task}</Text>
            </ViewFlexColumn>
            <ViewFlexRow>
                <Divider />
                <TextDone>{stats}</TextDone>
            </ViewFlexRow>
        </Container>
    )
}