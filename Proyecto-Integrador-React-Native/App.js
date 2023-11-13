import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { auth } from "./src/firebase/config";
import Register from './src/paginas/Register/Register';
import Login from './src/paginas/Login/Login';
import Home from './src/paginas/Home';
import Camara from './src/components/Camera/Camera';

const Stack = createNativeStackNavigator();

export default function App() {
  // El control de sesion deberia ser en app.js. Para ellos tendriamos que transformarlo en componente con estado y chequear sesion en componentDidMount.

  //Para mejorar la experiencia de usuario podemos usar un loader mientras chequeamos sesion.


  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Registro' component={Register} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
        <Stack.Screen name='Camara' component={Camara} />
        {/* si implementamos tabnavigation para el resto de la app, el tercer componente debe ser una navegación que tenga a Home como primer screen */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});