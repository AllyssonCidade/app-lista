import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
    width: 90%;
    height: 108px;
    display: flex;
    justify-content: space-around;
    align-self: center;
    background: #0066FF;
    border-radius: 20px;
    flex-direction: row ;
    padding: 10px 20px;
    margin-bottom: 20px;
`
export const Title = styled.Text`
    font-size: 20px;
    color: #FFFFFF;
    font-weight: bolder;
    `
export const Text = styled.Text`
    font-size: 18px;
    color: #FFFFFF;
    
    `
export const TextDone = styled.Text`
    font-size: 15px;
    color: #FFFFFF;
    transform: rotate(270deg);
    width: 108px;
    margin: auto;
    text-align: center;
    
`
export const Divider = styled.View`
    width: .5px;
    height: 70px;
    align-self: center;
    background-color: #FFFFFF;
    `
export const ViewFlexColumn = styled.View`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;
    `
export const ViewFlexRow = styled.View`
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 20%;
`