import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ActivityIndicator, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterScreen = () => {

    const navigation = useNavigation();

    const [nik, setNik] = React.useState('');
    const [nama, setNama] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegis = async (value) => {
        console.log('value', value);

        try {
            const response = await axios.post('http://192.168.1.37:5000/users/', {
                nik: value.nik,
                nama: value.nama,
                password: value.password
            })
            if (response.data.status == 200) {
                console.log('response', response.data)
                navigation.navigate('LoginScreen')
                ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
                ToastAndroid.show("Sign Up Berhasil", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Cek kembali data mu", ToastAndroid.SHORT)
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
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
                        Register
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                        Create a new Account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name='identifier' size={24} color="black" />
                        <TextInput
                            onChangeText={(nik) => setNik(nik)}
                            value={nik}
                            placeholder="NIK"
                            placeholderTextColor="black"
                            style={{
                                // fontSize: email ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 5,
                            }}
                        />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="rename-box" size={24} color="black" />
                        <TextInput
                            onChangeText={(nama) => setNama(nama)}
                            value={nama}
                            placeholder="Name"
                            placeholderTextColor="black"
                            style={{
                                // fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 5,
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                marginVertical: 5,
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={async () => await handleRegis({ nik, nama, password })}
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
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                            Register
                        </Text>
                    </Pressable>

                    <Pressable
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
                                Already have a account?
                            </Text>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    color: "#0A4D68",
                                    fontWeight: "500",
                                }}
                                onPress={() => navigation.navigate('LoginScreen')}
                            >
                                Sign in
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default RegisterScreen;