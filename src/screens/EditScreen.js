import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Image, TouchableOpacity, ToastAndroid, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import { StackActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../assets/image/Logo.png'

const EditScreen = ({route}) => {
  const navigation = useNavigation();
  const list_id = route.params.list_id;
  const list_kegiatan = route.params.kegiatan;

  const [date, setDate] = useState(new Date())
  const [id, setId] = useState('')
  const [kegiatan, setKegiatan] = useState(list_kegiatan)
  const [kendaraan, setKendaraan] = useState(list_kendaraan)
  const [jumlah, setJumlah] = useState(list_jumlah)
  const [status, setStatus] = useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Wash', value: 'Wash'},
    {label: 'Selesai', value: 'selesai'}
  ]);


  const [data, setData] = useState({
      id: '',
      kegiatan: '',
      kendaraan:'',
      jumlah:'',
      status: '',
      tanggal: ''
  })


  const UpdateList = async (sandi) => {
      console.log('value', sandi);
      try {
          const response = await axios.put(`http://192.168.1.37:5000/list?id=${list_id}`, {
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
  <View style={{flex : 1,
    backgroundColor : '#000',}}>
    <View >
      <Image source={Logo} style={{ width: 40, height: 40, borderRadius: 20 }}/>
    </View>
      <View style={{}}>
        <Text style={{}}>Kegiatan</Text>
          <TextInput
              style={{}}
              placeholder="kegiatan"
              placeholderTextColor="white"
              onChangeText={(kegiatan) => setKegiatan(kegiatan)}
              value={kegiatan}
          />
          <TextInput
              style={{}}
              placeholder="Kendaraan"
              placeholderTextColor="white"
              onChangeText={(kendaraan) => setKendaraan(kendaraan)}
              value={kendaraan}
          />
          <TextInput
              style={{}}
              placeholder="Jumlah"
              placeholderTextColor="white"
              onChangeText={(jumlah) => setJumlah(jumlah)}
              value={jumlah}
          />

            <Text style={styles.Text}>Status Pencucian</Text>
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
                <Text style={{}}>Tanggal</Text>

                <DatePicker date={date} onDateChange={setDate} mode='datetime' style={{marginVertical: 20}} />
                {console.log(date)}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                                    if (kegiatan == "") {
                                        ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                                    } else {
                                        UpdateList({ id: list_id, kegiatan: kegiatan, status: value, tanggal: date })
                                    }
                                }}>
                        <Text style={styles.textButton}>Edit</Text>
                    </TouchableOpacity>
      </View>
</View>
)
}

export default EditScreen

const styles = StyleSheet.create({})