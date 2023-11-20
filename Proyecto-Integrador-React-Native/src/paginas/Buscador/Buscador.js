import { Component } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {db, auth} from '../../firebase/config';


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoBuscado: '',
            usuarios: []
        }
    }

    buscarUsuario() {
        db.collection('users')
            .where('userName', '==', this.state.textoBuscado)
            .onSnapshot(snap => {
                const usuarios = snap.docs.map(doc => {
                    return {
                        id: doc.id,
                        owner: doc.data().owner,
                        photo: doc.data().photo,
                        email: doc.data().email,
                        createdAt: doc.data().createdAt,
                    }
                })
                this.setState({usuarios})
            })
    }


    render() {
        return (
            <View style={styles.formContainer}>

                <TextInput style={styles.input}
                    placeholder="Buscar usuario" 
                    onChangeText={(text) =>this.setState({textoBuscado: text})}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.buscarUsuario()}>
                    <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.usuarios}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("PerfilPublico", {userEmail: item.owner})}>
                                <Text>{item.owner}</Text>

                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => (
                        <View>
                            <Text>No hay usuarios cargados</Text>
                        </View>
                    )}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    inputTextArea: {
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#ccc",
      marginVertical: 10,
      paddingVertical: 15,
    },
    button: {
      backgroundColor: "#8E44AD",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#8E44AD",
    },
    textButton: {
      color: "#fff",
    },
  });


export default Buscador;