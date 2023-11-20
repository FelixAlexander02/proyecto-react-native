import { Component } from "react";
import { db, auth } from "../../firebase/config";
import { Text, View, ActivityIndicator, Image, StyleSheet } from "react-native";
import FlatListPosts from "../../components/FlatListPosts/FlatListPosts";

class PerfilPublico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      posts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("owner", "==", this.props.route.params.userEmail)
      .get()
      .then((snap) => {
        const user = snap.docs.map((doc) => {
          return {
            id: doc.id,
            userName: doc.data().userName,
            owner: doc.data().owner,
            avatar: doc.data().avatar,
            bio: doc.data().bio,
            createdAt: doc.data().createdAt,
          };
        });

        this.setState({ user: user[0], isLoading: false });

        db.collection("posts")
            .where("email", "==", this.props.route.params.userEmail)
            .onSnapshot((snap) => {
                const posts = snap.docs.map(doc => {
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
                this.setState({posts: posts})
            })
      }
      );
  }

  render() {
    if(!this.state.user) {
      return <ActivityIndicator color={"blue"} />
    }
    console.log(this.state.user);
    return (
      <View style={styles.container}>
        <Text>Usuario: {this.state.user.userName}</Text>
        <Text>Email: {this.state.user.owner}</Text>
        <Image source={{uri: this.state.user.avatar}} style={styles.avatar} />
        <Text>Bio: {this.state.user.bio}</Text>
        <FlatListPosts 
            posts={this.state.posts} 
            navigation={this.props.navigation} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        height: '100%',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: "100%"
    },
    list:{
        height: '100%',
    }

})

export default PerfilPublico;
