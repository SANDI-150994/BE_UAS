// import React from 'react'
import { StyleSheet, Text, View, ToastAndroid, TouchableOpacity, Pressable, TextInput, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DatePicker from 'react-native-date-picker'
import { StackActions } from '@react-navigation/native';
import Gambar from '../assets/image/logocarwash.jpg'

const AddScreen = () => {

  const navigation = useNavigation();
  const [kegiatan, setKegiatan] = React.useState('');
  const [kendaraan, setkendaraan] = React.useState('');
  const [jumlah, setjumlah] = React.useState('');
  const [date, setDate] = useState(new Date())

  const [data, setData] = useState({
    nik: '',
    password: '',
    name: ''
  })


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
      }
    } catch (e) {
      // error reading value
    }
  }


  const InsertList = async (value) => {
    console.log('value', value);

    try {
      const response = await axios.post('http://192.168.1.37:5000/list/', {
        nik: data.nik,
        kegiatan: value.kegiatan,
        kendaraan: value.kendaraan,
        jumlah: value.jumlah,
        tanggal: date
      })
      if (response.data.status == 200) {
        console.log('response', response.data);
        navigation.dispatch(
          StackActions.replace('HomeScreen')
        );
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
        ToastAndroid.show("Berhasil Tambah Kegiatan", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Input Error", ToastAndroid.SHORT)
    }

  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      padding: 10,
    }}
    >

      <View>
        {/* <Image source={Gambar} /> */}
      </View>

      <View style={{ marginTop: 20, }}>
        <Text style={{ fontSize: 30, color: '#0A4D68', fontWeight: 'bold', }}>Tambah Cucian</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <TextInput
          placeholder="Kegiatan"
          onChangeText={(kegiatan) => setKegiatan(kegiatan)}
          value={kegiatan}
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        />

        <TextInput
          placeholder="Kendaraan"
          onChangeText={(kendaraan) => setkendaraan(kendaraan)}
          value={kendaraan}
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        />

        <TextInput
          placeholder="Harga"
          onChangeText={(jumlah) => setjumlah(jumlah)}
          value={jumlah}
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        />

        <Text style={{
          width: 300,
          height: 50,
          // backgroundColor: '#e0e0e0',
          // borderRadius: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
          fontWeight: 'bold',
          fontSize: 18
        }}
        >Tanggal</Text>

        <DatePicker
          date={date}
          onDateChange={setDate}
          mode='datetime'
          style={{ marginVertical: 10, backgroundColor: '#fff', borderColor: '#9BA4B5', shadowColor: '#9BA4B5' }}
        />
      </View>

      <View >
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

          onPress={async () => await InsertList({ kegiatan, kendaraan, jumlah })}
        >
          <Text style={{ fontWeight: 'bold', color: '#0A4D68' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({})