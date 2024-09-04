import { StyleSheet, View } from "react-native";
import { Container, ContainerSelectedDate, TextContainer, TextContainerDay, TextSelectedDate, TextSelectedDateDay } from "./styles";

export function DateCart() {
    return (
        <View style={Localstyles.containerRow}>
            
            <ContainerSelectedDate>
                <TextSelectedDate>Jul</TextSelectedDate>
                <TextSelectedDateDay>23</TextSelectedDateDay>
                <TextSelectedDate>Ter</TextSelectedDate>
            </ContainerSelectedDate>

            <Container>
                <TextContainer>Jul</TextContainer>
                <TextContainerDay>24</TextContainerDay>
                <TextContainer>Qua</TextContainer>
            </Container>
            <Container>
                <TextContainer>Jul</TextContainer>
                <TextContainerDay>25</TextContainerDay>
                <TextContainer>Qui</TextContainer>
            </Container>
            <Container>
                <TextContainer>Jul</TextContainer>
                <TextContainerDay>26</TextContainerDay>
                <TextContainer>Sex</TextContainer>
            </Container>
        </View>
    );
}
const Localstyles = StyleSheet.create({
    containerRow:{
      width:'100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
})