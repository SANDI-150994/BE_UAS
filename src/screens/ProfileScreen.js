import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gambar from '../assets/image/thx.jpg'

const ProfileScreen = () => {
    const [nik, setNik] = useState('')
    const [nama, setNama] = useState('')
    const [passwordLama, setPasswordLama] = useState('')
    const [passwordBaru, setPasswordBaru] = useState('')
    const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

    const navigation = useNavigation();

    const [data, setData] = useState({
        nik: '',
        password: '',
        name: ''
    })

    console.log('nik', data.nik)
    console.log('password', data.password);
    console.log('name', data.name);

    useEffect(() => {
        getData()
        return () => { };
    }, []);

    const getData = async () => {
        try {
            let nik = await AsyncStorage.getItem('nik')
            let password = await AsyncStorage.getItem('password')
            let name = await AsyncStorage.getItem('name')
            if (nik !== null) {
                // value previously stored
                setData({
                    nik: nik,
                    nama: name,
                    password: password,
                    name: name
                })
                setNik(nik)
                setNama(name)
            }
        } catch (e) {
            // error reading value
        }
    }

    const resetPassword = async (value) => {
        console.log('value', value);
        try {
            const response = await axios.put('http://192.168.1.37:5000/users', {
                nik: value.nik,
                nama: value.nama,
                password: value.passwordLama,
                passwordBaru: value.passwordBaru,
            })
            if (response.data.status == 200) {
                console.log('response', response)
                ToastAndroid.show("Password berhasil diubah", ToastAndroid.SHORT)
                navigation.navigate('HomeScreen')
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali nik dan password", ToastAndroid.SHORT)
        }
    }

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('nik')
            await AsyncStorage.removeItem('password')
            await AsyncStorage.removeItem('name')
            navigation.navigate('LoginScreen')
        } catch (e) {
            // remove error
        }

        console.log('Done.')
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            padding: 10,
        }}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Gambar} style={{ width: 100, height: 100, borderRadius: 20 }} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 20, }}>

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        placeholder="nik"
                        placeholderTextColor="#b8b8b8"
                        onChangeText={(nik) => setNik(nik)}
                        value={nik}
                    // editable = {false}
                    />

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        placeholder="Nama"
                        placeholderTextColor="#b8b8b8"
                        onChangeText={(nama) => setNama(nama)}
                        value={nama}
                    />

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        placeholder="Password Lama"
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setPasswordLama(password)}
                        value={passwordLama}
                    />

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        placeholder="Password Baru"
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setPasswordBaru(password)}
                        value={passwordBaru}
                    />

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            position: 'relative'
                        }}
                        placeholder="Konfirmasi Password"
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setKonfirmasiSandi(password)}
                        value={konfirmasiSandi}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>

                        <TouchableOpacity
                            style={{
                                width: 300,
                                height: 50,
                                backgroundColor: '#9BA4B5',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                
                            }}
                            onPress={async () => {
                                if (nik == "" || passwordLama == "" || passwordBaru == "" || konfirmasiSandi == "") {
                                    ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                                } else if (nik !== data.nik || passwordLama !== data.password) {
                                    ToastAndroid.show('nik atau Password Salah', ToastAndroid.SHORT);
                                } else if (passwordBaru !== konfirmasiSandi) {
                                    ToastAndroid.show('Password Baru dan Konfirmasi Password Tidak Sama', ToastAndroid.SHORT);
                                } else {
                                    resetPassword({ nik: nik, nama: nama, passwordLama: passwordLama, passwordBaru: passwordBaru })
                                }
                            }} >
                            <Text style={{fontWeight:'bold', color:'#000'}}>Reset Password</Text>
                        </TouchableOpacity>




                        <TouchableOpacity style={{
                            width: 300,
                            height: 50,
                            backgroundColor: '#9BA4B5',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }} onPress={async () => await removeValue()}>
                            <Text style={{fontWeight:'bold', color:'#0A4D68'}}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})