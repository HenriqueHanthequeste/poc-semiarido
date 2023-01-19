import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

import API from '../../api';
import Item from '../Components/Item';

import AddIcon from '../../icons/add-line.svg'

export default function Home() {
  const [data, setData] = useState({});

  useEffect(()=>{
    async function GetData(){
      try {
        const response = await API.get("/itens");
        console.log(response)
      }catch (error) {
        console.log(JSON.stringify(error))
      }
    }

    GetData();
  },[])

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Minhas Instalações</Text>
            <TouchableOpacity style={styles.button}>
                <AddIcon width={28} height={28} fill="#000" />
            </TouchableOpacity>
        </View>

        <FlatList data={data} style={styles.itemArea} renderItem={({item}) => {
          <Item key={item.key} name={item.name} data={item.data} status={item.status} />}
        }/>

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
