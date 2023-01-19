import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import DeleteTrash from '../../../icons/delete-bin-fill.svg'

export default function Item(name, data, status) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text>Nome: Lorem Ipsum</Text>
                <Text>Data: 04/10/2022</Text>
                <Text>Sincronizado: Não</Text>
            </View>

            <TouchableOpacity>
                <DeleteTrash width={24} height={24} fill="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    width: '95%',
    height: '12%',

    marginTop: 10,

    borderRadius: 10,

    padding: 5
  }
});
