import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import DeleteTrash from '../../../icons/delete-bin-fill.svg';
import SyncIcon from '../../../icons/refresh-line.svg'

export default function Item(name, data, status) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.descriptionArea}>
                <Text style={styles.description}>Nome: Lorem Ipsum</Text>
                <Text style={styles.description}>Data: 04/10/2022</Text>
                <Text style={styles.description}>Sincronizado: Não</Text>
            </View>

            <TouchableOpacity>
                <DeleteTrash width={28} height={28} fill="#EE7528" />
            </TouchableOpacity>
            <TouchableOpacity>
                <SyncIcon width={28} height={28} fill="#00386D" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    width: '95%',
    height: '8%',

    marginTop: 10,

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
