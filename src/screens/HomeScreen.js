import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import * as Location from 'react-native-location'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Logo from '../assets/image/thx.jpg'
import Crausel from '../componen/crausel'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

const HomeScreen = () => {

    const navigation = useNavigation();

    const [cari, setCari] = useState('')
    const [list, setList] = useState([]);
    const [selesai, setSelesai] = useState([]);
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
                    password: password,
                    name: name
                })
                readData(nik)
            }
        } catch (e) {
            // error reading value
        }
    }

    const searchList = async (value) => {
        console.log('value', value);

        try {
            const responseAktif = await axios.post(`http://192.168.1.37:5000/list/searchAktif?nik=${data.nik}`, {
                cari: value.cari,
            })
            const responseSelesai = await axios.post(`http://192.168.1.37:5000/list/searchSelesai?nik=${data.nik}`, {
                cari: value.cari,
            })
            if (responseAktif.data.status == 200) {
                // console.log('response', response.data);
                setList(responseAktif.data.data)
                setSelesai(responseSelesai.data.data)

                ToastAndroid.show(responseAktif.data.metadata, ToastAndroid.SHORT)
                // DevSettings.reload()
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Gagal mencari data", ToastAndroid.SHORT)
        }

    }

    const readData = async (value) => {
        console.log('value', value);
        try {
            const aktif = await axios.get(`http://192.168.1.37:5000/list/aktif?nik=${value}`, {
            })
            const selesai = await axios.get(`http://192.168.1.37:5000/list/selesai?nik=${value}`, {
            })
            if (aktif.data.status == 200) {
                console.log('response', aktif.data);
                ToastAndroid.show(aktif.data.metadata, ToastAndroid.SHORT)
                setList(aktif.data.data)
                setSelesai(selesai.data.data)
                // DevSettings.reload()
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Gagal menampilkan list", ToastAndroid.SHORT)
        }

    }


    // console.log("ini data list", list);
    const listDone = async (value) => {
        console.log('value', value);

        try {
            const response = await axios.put(`http://192.168.1.37:5000/list/done?id=${value}`, {
            })
            const aktif = await axios.get(`http://192.168.1.37:5000/list/aktif?nik=${data.nik}`, {
            })
            const selesai = await axios.get(`http://192.168.1.37:5000/list/selesai?nik=${data.nik}`, {
            })
            if (response.data.status == 200) {
                console.log('response', response.data);
                ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
                setList(aktif.data.data)
                setSelesai(selesai.data.data)
                // DevSettings.reload()
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Gagal mengubah list", ToastAndroid.SHORT)
        }

    }

    const DeleteList = async (value) => {
        console.log('value', value);

        try {
            const response = await axios.delete(`http://192.168.1.37:5000/list?id=${value}`, {
            })
            const aktif = await axios.get(`http://192.168.1.37:5000/list/aktif?nik=${data.nik}`, {
            })
            const selesai = await axios.get(`http://192.168.1.37:5000/list/selesai?nik=${data.nik}`, {
            })
            if (response.data.status == 200) {
                console.log('response', response.data);
                ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
                setList(aktif.data.data)
                setSelesai(selesai.data.data)
                // DevSettings.reload()
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Gagal menghapus list", ToastAndroid.SHORT)
        }

    }

    // untuk menampilkan Lokasi 
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
    const [locationServicesEnabled, setlocationServicesEnable] = useState(false);

    useEffect(() => {
        checkIfLocationEnable();
        getCurrentLocation()
    }, []);

    const checkIfLocationEnable = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enabled the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
                // {cancelable: false}
            );
        } else {
            setlocationServicesEnable(enabled)
        }
    }

    const getCurrentLocation = async () => {
        let { Status } = await Location.requestForegroundPermissionAsync();

        if (Status !== "granted") {
            Alert.alert(
                "Permission denied",
                "Allow the app to use the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
                // {cancelable: false}
            );
        };
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords)

        if (coords) {
            const { latitude, longitude } = coords

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            // console.log(response)

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalcode}`;
                setdisplayCurrentAddress(address)
            }
        }
    }

    return (
        <ScrollView>
            <SafeAreaView>
                {/* Location N Profile */}
                <View style={{ flexDirection: 'row', alignItems: "center", padding: 10 }}>
                    <Icon name='location-enter' size={30} color="#fd5c63" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: '#0A4D68' }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('ProfileScreen')}
                        style={{ marginLeft: 'auto', marginRight: 7 }}>
                        <Image

                            style={{ width: 40, height: 40, borderRadius: 20 }} source={Logo} />
                    </Pressable>
                </View>

                {/* Search Bar */}
                <View style={{ padding: 10, margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7 }}>
                    <TextInput
                        onChangeText={(cari) => setCari(cari)}
                        value={cari}
                        placeholder='Search Items or More' />
                    <Icon
                        onPress={async () => {
                            searchList({ cari: cari })
                        }}
                        name='search-web' size={30} color="#fd5c63" />

                </View>

                {/* Image crausel */}
                <Crausel />

                {/* Daftar Pembelian yang muncul */}
                <View style={{ marginLeft: 10, marginTop: 20, }}>
                    <Text style={{ size: 50, color: '#0A4D68', fontWeight: 'bold' }}>Cucian Baru</Text>

                    {
                        list.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        width: "100%",
                                        height: 100,
                                        paddingLeft: 10,
                                        paddingVertical: 10,
                                        marginBottom: 10,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        backgroundColor: '#e0e0e0',
                                        // alignItems:'center'
                                    }}                                >
                                    <View>
                                        <TouchableOpacity
                                            onPress={async () => await listDone(item.id)}
                                        >
                                            <Icon name="check-bold" color={'#0A4D68'} size={20} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', marginLeft: 10 }}>
                                        <Text
                                            style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', }}
                                        >{item.kegiatan}</Text>
                                        <Text
                                            style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', }}
                                        >{item.kendaraan}</Text>
                                        <Text
                                            style={{ size: 50, color: '#088395', fontWeight: 'bold', }}
                                        >{item.jumlah}</Text>
                                        <Text
                                            style={{ size: 50, color: '#05BFDB', fontWeight: 'bold', }}
                                        >{item.tanggal}</Text>
                                    </View>

                                    <View style={{
                                        // backgroundColor: '#9BA4B5',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        marginHorizontal: 80,
                                        padding:5,
                                    }} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('EditScreen',
                                                    {
                                                        list_id: item.id,
                                                        kegiatan: item.kegiatan,
                                                        kendaraan: item.kendaraan,
                                                        jumlah: item.jumlah
                                                    })
                                            }}
                                        >
                                            <Icon name="pencil" color={'grey'} size={25} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={async () => await DeleteList(item.id)
                                            }
                                        >
                                            <Icon name="trash-can" color={'grey'} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }

                    <Text 
                    style={{ color: '#0A4D68', marginTop: 20, fontWeight: 'bold' }}
                    >
                        Cucian Selesai</Text>
                    {

                        selesai.map((item, index) => {
                            return (
                                <View 
                                style={{
                                    width: "100%",
                                    height: 100,
                                    paddingLeft: 10,
                                    paddingVertical: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    backgroundColor: '#e0e0e0',
                                    // alignItems:'center'
                                }}     
                                >

                                    <View 
                                    style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', marginLeft: 10 }}
                                    >
                                        <Text
                                        style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', }}
                                        >{item.kegiatan}</Text>
                                        <Text
                                        style={{ size: 50, color: '#0A4D68', fontWeight: 'bold', }}
                                        >{item.kendaraan}</Text>
                                        <Text
                                        style={{ size: 50, color: '#088395', fontWeight: 'bold', }}
                                        >{item.jumlah}</Text>
                                        <Text
                                        style={{ size: 50, color: '#05BFDB', fontWeight: 'bold', }}
                                        >{item.tanggal}</Text>
                                    </View>

                                    <View 
                                    style={{
                                        // backgroundColor: '#9BA4B5',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        marginHorizontal: 80,
                                        padding:5,
                                    }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('EditScreen',
                                                    {
                                                        list_id: item.id,
                                                        kegiatan: item.kegiatan,
                                                        kendaraan: item.kendaraan,
                                                        jumlah: item.jumlah
                                                    })
                                            }}
                                        >
                                            <Icon name="pencil" color={'grey'} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                    <View >
                                        <TouchableOpacity
                                            onPress={async () => await DeleteList(item.id)}
                                        >
                                            <Icon name="trash-can" color={'grey'} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

                {/* Tombol Tambah kegiatan */}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginBottom: 10,
                    position: 'relative',
                    marginTop: 100,

                }}

                >
                    <Icon
                        onPress={() => navigation.navigate('AddScreen')}
                        name="plus-circle-outline" color={'#0A4D68'} size={70} />
                </View>
            </SafeAreaView >
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})