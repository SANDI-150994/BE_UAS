import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ActivityIndicator, Pressable, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {

    const navigation = useNavigation();

    const [nik, setNik] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogin = async (value) => {
        console.log('value', value)

        try {
            const response = await axios.post('http://192.168.45.19:5000/users/login', {
                nik: value.nik,
                password: value.password
            })
            if (response.data.status == 200) {
                console.log('response', response.data);
                ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
                // AsyncStorage.setItem
                await AsyncStorage.setItem('password', value.password)
                await AsyncStorage.setItem('nik', value.nik)
                // await AsyncStorage.setItem('name', response.data.users.nama)
                navigation.navigate('HomeScreen')
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Cek kembali nik dan password", ToastAndroid.SHORT)
        }

    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                padding: 10,
            }}
        >
            {/* {loading ? ( */}
            {/* <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1 }}>
                <Text style={{ marginRight: 10 }}>Loading</Text>
                <ActivityIndicator size="large" color={"red"} />
            </View> */}
            {/* ) : ( */}
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
                        Sign In
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                        Sign In to your account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name='identifier' size={24} color="black" />
                        <TextInput
                            placeholder="NIK"
                            onChangeText={(nik) => setNik(nik)}
                            value={nik}
                            placeholderTextColor="black"
                            style={{
                                // fontSize: email ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 7,
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* <Ionicons name="key-outline" size={24} color="black" /> */}
                        <Icon name="key-variant" size={24} color="black" />
                        <TextInput
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="black"
                            style={{
                                // fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 7,
                            }}
                        />
                    </View>

                    <Pressable
                        // onPress={login}
                        onPress={async() => await handleLogin({nik, password})}
                        style={{
                            width: 200,
                            backgroundColor: "#318CE7",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white", fontWeight: "bold" }}>
                            Login
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate("RegisterScreen")}
                        style={{ marginTop: 20 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    color: "gray",
                                    fontWeight: "500",
                                    marginRight: 5
                                }}
                            >
                                Don't have a account?
                            </Text>
                            <Text
                                // onPress={() => navigation.navigate("RegisterScreen")}
                                style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    color: "#0A4D68",
                                    fontWeight: "500",
                                }}
                            >
                                Sign Up
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
            {/* )} */}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({


});

export default LoginScreen;