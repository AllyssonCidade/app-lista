import { Text, StyleSheet  } from "react-native"
import { Buttom } from "../components/Buttom"
import { PropsScreensApp } from "../routes/interfaces"

export const Login= ({ navigation }:PropsScreensApp)=>{
    return(
        <>
            <Text>Login</Text>
            <Buttom onPress={()=> navigation.navigate('Home')} >Go</Buttom>
        </>
    )
}
const styles = StyleSheet.create({
    h1:{

    }
})