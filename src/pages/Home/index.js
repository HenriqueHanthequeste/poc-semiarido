import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Item from '../Components/Item';

export default function Login() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Minhas Instalações</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={{color: 'white'}}>+</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.itemArea}>
          <Item />
        </View>

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
    marginTop: 32,
    
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
    marginRight: 8,

    backgroundColor: 'black',

    width: 24,
    height: 24,
    borderRadius: 5,

    alignItems: 'center'
  },
  itemArea:{
    alignItems: 'center',
    
    flex: 1,

    marginTop: 15
  }
});
