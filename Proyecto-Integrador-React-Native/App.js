import { Image } from 'react-native';
import MainNavegation from './src/components/navegation/MainNavegation';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return ( <MainNavegation /> );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
})
export default App;