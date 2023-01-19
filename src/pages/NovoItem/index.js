import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Camera } from 'expo-camera';

import BackIcon from '../../icons/arrow-left-line.svg'
import CameraIcon from '../../icons/camera-line.svg'

export default function NovoItem() {
  const navigation = useNavigation();
  const [showCamera, setShowCamera] = useState();
  const [permission, setPermission] = Camera.useCameraPermissions();

  async function ToggleCamera(){
    const cameraStatus = await Camera.requestCameraPermissionsAsync();

    if(cameraStatus.status === "granted"){
        setPermission(cameraStatus);
        setShowCamera(!showCamera)
    }
  }

  return (
    <View style={styles.container}>
         {showCamera ? 
         (
         <View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Home")}}>
                    <BackIcon width={28} height={28} fill="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Nova Instalação</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TextInput style={styles.input} placeholder="Digite o nome da instalação"/>
                <TextInput style={styles.input} placeholder="Data da instalação"/>
                <TextInput style={styles.input} placeholder="Obs"/>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                <Text style={{...styles.title}}>Adicionar Fotos</Text>

                <TouchableOpacity style={{marginRight: 15, justifyContent: 'center'}} onPress={() => ToggleCamera()}>
                    <CameraIcon width={28} height={28} fill="#000" />
                </TouchableOpacity>
            </View>
        </View>)
        :
        (<View style={{flex:1}}>
            <Camera style={styles.fixedRatio} ratio={'4:3'} type={Camera.Constants.Type.back}/>
            <TouchableOpacity onPress={() => ToggleCamera()}>
                <Text>Fechar</Text>
            </TouchableOpacity>  
        </View>) }
    </View>
  );
}

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    title:{
      color: '#000',
  
      marginLeft: 15,
  
      fontSize: 22,
      fontWeight: 'bold'
    },
    header:{
        flexDirection:'row',
        marginTop: '12%',
        
        alignItems: 'center',
        marginLeft: 15
    },
    input:{
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderRadius: 8,

        marginTop: 15,
        padding: 8
    },
    title2:{
        color: '#000',
    
        marginLeft: 15,
    
        fontSize: 22,
        fontWeight: 'bold'
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    }
  });
