import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native';

import PencilIcon from '../../icons/pencil-fill.svg'

export default function EditarItem({route}) {
    const navigation = useNavigation();
    const [item, setItem] = useState({})

    const { value } = route.params;

    async function handleSave(){
      var objs = JSON.parse(await AsyncStorage.getItem('item'))
      objs.map(obj => {
        if(obj.id == value.id){
            obj.name = item.name != undefined ? item.name : value.name
            obj.obs = item.obs != undefined ? item.obs : value.obs,
            obj.data = item.data != undefined ? item.data : value.data
        }
      })

      await AsyncStorage.setItem('item', JSON.stringify(objs))

      navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Editar Item</Text>
                <TouchableOpacity style={styles.button} onPress={() => { handleSave() } }>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>

            <TextInput style={styles.textTitle} placeholder={value.name} onChangeText={(e) => setItem(values => ({...values, name: e}))}/>
            <TextInput style={styles.textTitle} placeholder={value.data} onChangeText={(e) => setItem(values => ({...values, data: e}))}/>
            <TextInput style={styles.textTitle} placeholder={value.obs} onChangeText={(e) => setItem(values => ({...values, obs: e}))}/>

            <Text style={{marginTop: 15, marginLeft: 10, marginBottom: 10, fontSize: 22, fontWeight: 'bold'}}>Fotos</Text>
            <ScrollView contentContainerStyle={{ flexDirection:'row', flexWrap: 'wrap'}} style={{width: '100%'}}>
                {value.image.map((item, index) => 
                    <TouchableOpacity key={index} style={{width:100, height:100, marginLeft: 10, marginBottom: 10, alignSelf: 'center'}}>
                        <Image key={index} source={{uri:item}} style={{width:100, height:100}} />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  header:{
    flexDirection:'row',
    marginTop: 40,
    marginBottom: 25,
    
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  button:{
    marginRight: 10
  },    
  title:{
    color: '#000',

    marginLeft: 8,

    fontSize: 22,
    fontWeight: 'bold'
  },
  textTitle:{
    width: '90%',
    height: '6%',

    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,

    marginBottom: 12,
    marginLeft: 15,
    padding: 5
  }
})