import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import NovoItem from './src/pages/NovoItem';
import EditarItem from './src/pages/EditarItem';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home"  component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="NovoItem" component={NovoItem} options={{headerShown: false}} />
        <Stack.Screen name="EditarItem" component={EditarItem} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}