import React from 'react'
import { ActivityIndicator, StyleSheet, Image, Text, View } from 'react-native'
import { Buttom } from '../Buttom'
import circles from "@/assets/images/circles.png";

export default function LoadingScreen() {

  return (
    <>
        <Image source={circles} style={styles.circles} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Carregando...</Text>
                <View style={styles.inputContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                <Buttom size="xlarge" color='white'></Buttom>
                </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#8fe1d745',
        flex: 1,
    },
    circles: {
        left: -137,
        height: 243,
        width: 270,
    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
        margin: 100,
    },
    linkText: {
        color: 'blue',
        marginTop: 10,
        marginBottom: 10,
    },
    p: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 5,
    }
});
