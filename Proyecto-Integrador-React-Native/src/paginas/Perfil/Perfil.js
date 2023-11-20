import { Component } from "react";
import { db, auth } from "../../firebase/config";
import FlatListPosts from "../../components/FlatListPosts/FlatListPosts";
import { View, Text,Image, StyleSheet, TouchableOpacity } from "react-native";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: []
    };
  }

  componentDidMount() {
    db.collection('posts')
            .where('userId', '==', auth.currentUser.uid)
            .onSnapshot(snap => {
                const myPosts = snap.docs.map( doc => {
                    return {
                        id: doc.id,
                        texto: doc.data().texto,
                        photo: doc.data().photo,
                        userId: doc.data().userId,
                        email: doc.data().email,
                        createdAt: doc.data().createdAt,
                        likes: doc.data().likes,
                        comments: doc.data().comments,
                    }
                })
                this.setState({myPosts})
            })
  }

  logout() {
    auth.signOut();
    //redirigir al usuario a la home page 
    // this.props.navigation.navigator('Login')
}

  render() {
    return (
        <View>
            <Text>Total de posteos {this.state.myPosts.length}</Text>
            <FlatListPosts posts={this.state.myPosts} />
            <Image source={{uri: auth.currentUser.photoURL}} style={{width: 100, height: 100}} />
            <Text>{this.state.perfilUsuario}</Text>
            <TouchableOpacity onPress={() => this.logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );


  }
}

export default Perfil;

