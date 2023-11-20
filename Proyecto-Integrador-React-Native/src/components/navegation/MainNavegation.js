import { Component } from "react";
import { auth } from "../../firebase/config";
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnautenticatedNavigation from "./UnautenticatedNavigation";
import AutenticatedNavigation from "./AutenticatedNavigation";
import Comments from "../../paginas/Post/commets/Comments";
import PerfilPublico from "../../paginas/Perfil/PerfilPublico";

const Stack = createNativeStackNavigator();

class MainNavegation extends Component {
  constructor(props) {
    super(props)
    this.state = {

      isLoading: true,
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoading: false,
          isAuthenticated: true
        })
        console.log('hay usuario logueado');
      } else {
        this.setState({
          isLoading: false,
          isAuthenticated: false,
        })
        console.log('no hay usuario logueado');
      }
    })
  }

  // El control de sesion deberia ser en app.js. Para ellos tendriamos que transformarlo en componente con estado y chequear sesion en componentDidMount.

  //Para mejorar la experiencia de usuario podemos usar un loader mientras chequeamos sesion.


  render() {
    return (

      <NavigationContainer style={styles.container} >
        {
          this.state.isLoading ?
            <View style={styles.container}>
              <ActivityIndicator size='large' />
            </View>
            :
            <Stack.Navigator >
              {this.state.isAuthenticated ?
                <Stack.Screen name='authenticated'
                  component={AutenticatedNavigation}
                  options={{ headerShown: false }} />
                :
                <Stack.Screen name='unauthenticated'
                  component={UnautenticatedNavigation}

                  options={{ headerShown: false }} />
              }
              {/* rutas visibles tanto para usuarios autenticados como no autenticados */}
              <Stack.Screen name='Comments' component={Comments} />
              <Stack.Screen name="PerfilPublico" component={PerfilPublico} />
            </Stack.Navigator>
        }
      </NavigationContainer>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',

  }
});


export default MainNavegation;