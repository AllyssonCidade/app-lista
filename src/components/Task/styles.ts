import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
    width: 90%;
    height: 108px;
    display: flex;
    align-self: center;
    background: #0066FF;
    border-radius: 20px;
    display: flex;
    flex-direction: row ;
    justify-content: space-between;
    padding: 10px 20px;
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
    font-size: 16px;
    color: #FFFFFF;
    transform: rotate(270deg);
`
export const Divider = styled.View`
    width: .5px;
    height: 60px;
    background-color: #FFFFFF;
    `
export const ViewFlexColumn = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 90%;
    `
export const ViewFlexRow = styled.View`
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`