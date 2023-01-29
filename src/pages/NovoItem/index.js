import { cloneElement, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Camera } from 'expo-camera';

import BackIcon from '../../icons/arrow-left-line.svg'
import CameraIcon from '../../icons/camera-line.svg'

export default function NovoItem({route}) {
  const { setData } = route.params;

  const navigation = useNavigation();
  const [showCamera, setShowCamera] = useState(true);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({})

  const [permission, setPermission] = Camera.useCameraPermissions();

  var imagesArray = []
  useEffect(()=>{
    async function getPermissions(){
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
    
        if(cameraStatus.status === "granted"){
            setPermission(cameraStatus);
        }
    }

    getPermissions();
    console.log(item?.photos)
  },[item])

  async function ToggleCamera(){

    setShowCamera(!showCamera)
  }

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        console.log(data.uri)
        setImage(data.uri);
        setOpen(true)
    }
  }

  const handleSave = () => {
    setImages(images => [...images, image]);
    // imagesArray.push(imagesArray)

    setItem(values => ({...values, photos:{images}}))
    setOpen(false);
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
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Home")}}>
                    <BackIcon width={28} height={28} fill="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Nova Instalação</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TextInput style={styles.input} placeholder="Digite o nome da instalação" onChangeText={(e) => setItem(values => ({...values, name: e}))}/>
                <TextInput style={styles.input} placeholder="Data da instalação" onChangeText={(e) => setItem(values => ({...values, data: e}))}/>
                <TextInput style={styles.input} placeholder="Obs" onChangeText={(e) => setItem(values => ({...values, obs: e}))}/>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                <Text style={{...styles.title}}>Adicionar Fotos</Text>

                <TouchableOpacity style={{marginRight: 15, justifyContent: 'center'}} onPress={() => {ToggleCamera()}}>
                    <CameraIcon width={28} height={28} fill="#000" />
                </TouchableOpacity>
            </View>
        </View>)
        :
        (<View style={{flex:1, justifyContent: 'center', marginTop: 35, aspectRatio: 1}}>
            <Camera 
                style={styles.fixedRatio} 
                ratio={'4:3'} 
                type={Camera.Constants.Type.back}
                ref={ref => setCamera(ref)}> 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => ToggleCamera()}>
                        <Text style={{color: 'white', fontSize: 18}}>Fechar</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.buttonCamera} onPress={() => takePicture()}>
                        <CameraIcon width={48} height={48} fill="#000" />
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
    },
    buttonContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,

    },
    button:{
        flex: 0.1,
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
    }
  });

