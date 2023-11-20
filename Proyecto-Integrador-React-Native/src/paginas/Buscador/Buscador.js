import { Component } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
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
            <View>
                <Text>Buscador de usuarios</Text>

                <TextInput
                    placeholder="Buscar usuario" 
                    onChangeText={(text) =>this.setState({textoBuscado: text})}
                />
                <TouchableOpacity onPress={() => this.buscarUsuario()}>
                    <Text>Buscar</Text>
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

export default Buscador;