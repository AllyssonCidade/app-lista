import { Text, View } from 'react-native';
import { Container, ContainerText, ContainerButtons } from './styles'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Buttom } from '../Buttom';
import { useNavigation } from '@react-navigation/native';

export type ModalAddTaskProps = {
    onPress?: ()=> void;
}

export default function ModalAddTask({...props}:ModalAddTaskProps) {
    const navigation = useNavigation();
    return(
        <Container >
            <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <ContainerText >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}} >Task: Trabalho</Text>
                    <Text style={{fontSize: 13}}>O que deseja fazer:</Text>
                </ContainerText>
                <AntDesign  name="closecircleo" size={24} color="black" />
            </View>
            <ContainerButtons>
                <Buttom 
                    size='small'
                    onPress={()=>
                    navigation.navigate('AdicionarTask')}>Adicionar
                </Buttom>

                <Buttom 
                    size='small'
                    onPress={()=>
                    navigation.navigate('Home')}>Concluir
                </Buttom>

                <Buttom 
                    size='small'
                    color='red' 
                    onPress={()=>
                    navigation.navigate('Home')}>Excluir
                </Buttom>
            </ContainerButtons>
        </Container>
    )
}
