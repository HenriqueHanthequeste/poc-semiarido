import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Login() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Digite seu usuário"/>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry={true}/>

        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Home")}}>
            <Text style={{color: '#FFF'}}>Logar</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input:{
    width: '90%',
    height: '6%',

    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,

    marginBottom: 12,
    padding: 5
  },
  button:{
    width: '35%',
    height: '6%',

    backgroundColor: "blue",

    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8
 }
});
