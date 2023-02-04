import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import API from '../../api';
import Item from '../Components/Item';

import AddIcon from '../../icons/add-line.svg'

export default function Home() {
  const [name, setName] = useState("name")
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(()=>{
    console.log(name)
    if(isFocused){
      async function GetData(){
        setIsLoading(true);
        const value =  JSON.parse(await AsyncStorage.getItem('item'))
        setData(value)
      }
        
      GetData();
      setIsLoading(false)
    }
  },[isFocused, name])

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Minhas Instalações</Text>
            <TouchableOpacity style={styles.button} onPress={async () => { var val = await AsyncStorage.removeItem('item');
          console.log(val)} }>
                <AddIcon width={28} height={28} fill="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("NovoItem", { newItem: setData()})} }>
              <AddIcon width={28} height={28} fill="#000" />
            </TouchableOpacity>
        </View>

      {  isLoading ?  <ActivityIndicator color="#000" size={48}/> : <FlatList key={name} style={styles.itemArea} data={data} keyExtractor={ (item) => String(item.id)} renderItem={
          ({item}) => <Item fullData={item} change={setName} key={item.id} id={item.id} name={item.name} data={item.data} status={item.sync} onPress={ () =>{navigation.navigate("EditarItem", { value: item  }) } } />
        }/>}

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
    marginTop: '12%',
    
    alignItems: 'center',

    justifyContent: 'space-between',
    
  },
  title:{
    color: '#000',

    marginLeft: 8,

    fontSize: 22,
    fontWeight: 'bold'
  },
  button:{
    marginRight: 12,

    alignItems: 'center'
  },
  itemArea:{    
    flex: 1,

    marginTop: 15
  }
});
