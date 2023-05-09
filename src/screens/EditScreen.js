import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Image, TouchableOpacity, ToastAndroid, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import { StackActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../assets/image/Logo.png'

const EditScreen = ({ route }) => {
  const navigation = useNavigation();
  const list_id = route.params.list_id;
  const list_kegiatan = route.params.kegiatan;
  const list_kendaraan = route.params.kendaraan;
  const list_jumlah = route.params.jumlah;

  const [date, setDate] = useState(new Date())
  const [id, setId] = useState('')
  const [kegiatan, setKegiatan] = useState(list_kegiatan)
  const [kendaraan, setKendaraan] = useState(list_kendaraan)
  const [jumlah, setJumlah] = useState(list_jumlah)
  const [status, setStatus] = useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Wash', value: 'Wash' },
    { label: 'Selesai', value: 'selesai' }
  ]);


  const [data, setData] = useState({
    id: '',
    kegiatan: '',
    kendaraan: '',
    jumlah: '',
    status: '',
    tanggal: ''
  })


  const UpdateList = async (sandi) => {
    console.log('value', sandi);
    try {
      const response = await axios.put(`http://192.168.45.19:5000/list?id=${list_id}`, {
        kegiatan: sandi.kegiatan,
        kendaraan: sandi.kendaraan,
        jumlah: sandi.jumlah,
        status: value,
        tanggal: sandi.tanggal,
      })
      if (response.data.status == 200) {
        console.log('response', response)
        ToastAndroid.show("data berhasil diubah", ToastAndroid.SHORT)
        navigation.dispatch(
          StackActions.replace('HomeScreen')
        );
      }
    } catch (error) {
      console.log(error.message)
      ToastAndroid.show("Cek kembali nim dan password", ToastAndroid.SHORT)
    }
  }


  return (
    <View style={{
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      // justifyContent:'center',
      padding: 10,
    }}>
      {/* <View >
      <Image source={Logo} style={{ width: 40, height: 40, borderRadius: 20 }}/>
    </View> */}
      <View style={{
        marginVertical: 20,
      }}>
        <Text style={{ size: 20, color: '#0A4D68', fontWeight: 'bold', marginBottom: 5 }}>Pekerjaan</Text>
        <TextInput
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
          placeholder="kegiatan"
          placeholderTextColor="#088395"
          onChangeText={(kegiatan) => setKegiatan(kegiatan)}
          value={kegiatan}
        />
        <Text style={{ size: 20, color: '#0A4D68', fontWeight: 'bold', marginBottom: 5 }}>Jenis Kendaraan</Text>
        <TextInput
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
          placeholder="Kendaraan"
          placeholderTextColor="#088395"
          onChangeText={(kendaraan) => setKendaraan(kendaraan)}
          value={kendaraan}
        />
        <Text style={{ size: 20, color: '#0A4D68', fontWeight: 'bold', marginBottom: 5 }}>Harga</Text>
        <TextInput
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
          placeholder="Jumlah"
          placeholderTextColor="#088395"
          onChangeText={(jumlah) => setJumlah(jumlah)}
          value={jumlah}
        />
      </View>

      <Text style={{ size: 25, color: '#0A4D68', fontWeight: 'bold', marginBottom: 5 }}
      >
        Status Pencucian</Text>
      <DropDownPicker
        open={open}
        value={value}
        onSelectItem={(status) => setStatus(status)}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDown}
      />
      <Text style={{ size: 25, color: '#0A4D68', fontWeight: 'bold', marginBottom: 5, marginTop:10 }}>Tanggal</Text>

      <DatePicker date={date} onDateChange={setDate} mode='datetime' style={{ marginVertical: 10, backgroundColor: '#fff', borderColor: '#9BA4B5', shadowColor: '#9BA4B5' }} />
      {console.log(date)}

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
          if (kegiatan == "") {
            ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
          } else {
            UpdateList({ id: list_id, kegiatan: kegiatan, status: value, tanggal: date })
          }
        }}>
        <Text style={{size:18, fontWeight:'bold', color:"#0A4D68"}}>Edit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditScreen

const styles = StyleSheet.create({})