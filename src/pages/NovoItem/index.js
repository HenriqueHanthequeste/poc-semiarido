import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Image, Modal, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { Camera } from 'expo-camera';

import BackIcon from '../../icons/arrow-left-line.svg'
import CameraIcon from '../../icons/camera-line.svg'
import tmbn from '../../icons/tmbn.jpg'
import AddPhoto from '../../icons/camera-add.svg'

export default function NovoItem({route}) {
  const { setData } = route.params;

  const navigation = useNavigation();
  const [showCamera, setShowCamera] = useState(true);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const [permission, setPermission] = Camera.useCameraPermissions();

  useEffect(()=>{
    async function getPermissions(){
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
    
        if(cameraStatus.status === "granted"){
            setPermission(cameraStatus);
        }
    }

    getPermissions();
  },[])

  async function ToggleCamera(){

    setShowCamera(!showCamera)
  }

  const storeData = async () => {
    const obj = {
        id: uuid.v4(),
        ...item,
        sync: false,
        image:[
            ...images   
        ]
    }
    
    try {
        var array = []

        var itens = await AsyncStorage.getItem('item')

        if(itens){
            array = JSON.parse(itens)
        }
        
        array.push(obj)

        await AsyncStorage.setItem('item', JSON.stringify(array))
        
    } catch (error) {
        console.log(error)
    }

    navigation.navigate("Home")
  }

  const takePicture = async () => {
    if(camera){
        setIsLoading(true)
        const data = await camera.takePictureAsync({skipProcessing: true})
        setIsLoading(false)
        
        // console.log(data.uri)
        setImage(data.uri);
        setOpen(true)
    }
  }

  const handleSave = () => {
    setImages(images => [...images, image]);

    setOpen(false);
    ToggleCamera();
  }

  const cancelPicture = async () => {
    setOpen(false);
    setImage(null);
  }

  return (
    <View style={styles.container}>
         {showCamera ? 
         (
         <View>
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => {navigation.navigate("Home")}}>
                        <BackIcon width={28} height={28} fill="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title3}>Nova Instalação</Text>
                </View>


                <TouchableOpacity style={styles.saveButton} onPress={() => {storeData()}}>
                    <Text style={styles.saveTextButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
                <TextInput style={styles.input} placeholder="Digite o nome da instalação" onChangeText={(e) => setItem(values => ({...values, name: e}))}/>
                <TextInput style={styles.input} placeholder="Data da instalação" onChangeText={(e) => setItem(values => ({...values, data: e}))}/>
                <TextInput style={styles.input} placeholder="Obs" onChangeText={(e) => setItem(values => ({...values, obs: e}))}/>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                <Text style={{...styles.title}}>Fotos</Text>

            </View>
            <ScrollView contentContainerStyle={{ flexDirection:'row', flexWrap: 'wrap'}} style={{width: '100%'}}>
                {images.map((item, index) => <Image key={index} source={{uri:item}} style={{width:100, height:100, marginLeft: 10, marginBottom: 10, alignSelf: 'center'}} />)}
                <TouchableOpacity  onPress={() => {ToggleCamera()}} style={{width: 100, height: 100, marginLeft: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDDD', borderRadius: 10}}>
                    <AddPhoto width={62} height={62} fill="#0000" />
                </TouchableOpacity>
            </ScrollView>
        </View>)
        :
        (<View style={{flex:1, justifyContent: 'center', marginTop: 35, aspectRatio: 1}}>
            <Camera 
                style={styles.fixedRatio} 
                ratio={'4:3'} 
                type={Camera.Constants.Type.back}
                ref={ref => setCamera(ref)}
                > 
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => ToggleCamera()}>
                        <Text style={{color: 'white', fontSize: 18}}>Fechar</Text>
                    </TouchableOpacity>

                     <TouchableOpacity style={styles.buttonCamera} onPress={() => takePicture()}>
                     { isLoading ? <ActivityIndicator color="#000" size={48}/> :<CameraIcon width={48} height={48} fill="#000" />}
                    </TouchableOpacity>
                </View>
            </Camera>

        </View>) }
            {image && 
            <Modal 
                animationType='slide'
                transparent={false}
                visible={open}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>

                        <Image style={{width: '100%', height: 500}} source={{uri: image}}/>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <TouchableOpacity style={styles.buttonClose} onPress={()=> cancelPicture()}>
                                <Text style={{fontSize: 18 }}>Fechar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSave} onPress={()=> handleSave()}>
                                <Text style={{fontSize: 18 }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>}
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
    title3:{
        color: '#000',
    
        marginLeft: 0,
    
        fontSize: 22,
        fontWeight: 'bold'
      },
    header:{
        flexDirection:'row',
        marginTop: '12%',
        
        alignItems: 'center',
        marginLeft: 15,
        justifyContent: 'space-between'
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
    },
    buttonContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,

    },
    button:{
        flex:0.1,
        width: 50,
        height: 20,        
    },
    buttonBack:{
        width: 50,
        height: 20,        
    },
    buttonCamera:{
        backgroundColor: 'white',
        width: 80,
        height: 80,
        
        borderRadius: 50,

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 100,
        marginLeft: 75
    },
    buttonClose: {
        alignSelf: 'center',
        marginTop: 20,
        width: 80,
        borderRadius: 10,
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'  
    },
    buttonSave: {
        alignSelf: 'center',
        marginTop: 20,
        width: 80,
        borderRadius: 10,
        backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'  
    },
    saveButton:{
        marginRight: 15
    },
    saveTextButton:{
        fontSize: 16,
        fontWeight: 'bold'
    }
  });

