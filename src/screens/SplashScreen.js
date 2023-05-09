import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Gambar from '../assets/image/carwash.png'

const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace("LoginScreen");
    }, 3000);
    return (
        <View style={styles.container}>
            <Image source={Gambar} style={styles.logo} />

            <View stylele={{ marginTop: 20 }}>
                <Text style={styles.text}>App-CarWash</Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A4D68',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        // marginTop: 0,
        // justifyContent: 'center',
    }
})