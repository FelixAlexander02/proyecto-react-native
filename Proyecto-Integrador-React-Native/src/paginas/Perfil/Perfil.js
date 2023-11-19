import { Component } from "react";
import { db, auth } from "../../firebase/config";
import { View, Text } from "react-native-web";
import FlatListPosts from "../../components/FlatListPosts/FlatListPosts";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
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

  render() {
    return (
        <View>
            <Text>Total de posteos {this.state.myPosts.length}</Text>
            <FlatListPosts posts={this.state.myPosts} />
        </View>
    );


  }
}

export default Perfil;
