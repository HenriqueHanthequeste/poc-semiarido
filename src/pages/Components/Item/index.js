import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import DeleteTrash from '../../../icons/delete-bin-fill.svg';
import SyncIcon from '../../../icons/refresh-line.svg'

import API from '../../../api';

export default function Item({fullData, change, id , name, data, status, onPress}) {
    const navigation = useNavigation();

    async function handleDelete(){
      Alert.alert('Excluir', 'Deseja excluir o item?', [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Ok',
          onPress: async () => {
            var value = JSON.parse(await AsyncStorage.getItem('item'))
            value.pop(obj => obj.id = id)

            await AsyncStorage.setItem('item', JSON.stringify(value))
            change(uuid.v4())
          }
        }
      ])
    }

    async function handleSync(){
      try {
        var post = await API.post("/sync", {
          fullData
        })

        console.log(post.data)
      } catch (error) {
        console.log(error)
      }

    }

    return (
        <TouchableOpacity onPress={() => onPress()}>
          <View style={styles.container}>
              <View style={styles.descriptionArea}>
                  <Text style={styles.description}>Nome: {name}</Text>
                  <Text style={styles.description}>Data: {data} </Text>
                  <Text style={styles.description}>Sincronizado: {status === true ? 'sim' : 'não'}</Text>
              </View>

              <TouchableOpacity style={{width: 28, height: 28}} onPress={(e) => handleDelete()}>
                  <DeleteTrash width={28} height={28} fill="#EE7528" />
              </TouchableOpacity>
              <TouchableOpacity style={{width: 28, height: 28}} onPress={() => handleSync()}>
                  <SyncIcon width={28} height={28} fill="#00386D" />
              </TouchableOpacity>
          </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    width: '95%',
    height: 75,

    marginTop: 10,
    marginLeft: 8,
    borderRadius: 10,

    padding: 5,
    flexDirection: 'row',

    justifyContent: 'space-between'
  },
  description:{
    fontSize: 14,
    margin: 5
  },
  descriptionArea:{
    flexDirection: 'row',
    maxWidth: '80%',
    flexWrap:'wrap'
  }
});
