import { View, Text, Image, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { auth, db, storage} from "../../../firebase/config";
import { Component } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";

class PostItemList extends Component {
  constructor(props) {
    super(props);
   
  }

  deletePost(id, photo) {
    storage.refFromURL(photo).delete()
    .then(() => {
      db.collection('posts').doc(id).delete()
      .then(() => {
        alert('Post elimiado con exito')
      })
      .catch(error => {
        alert('error al eliminar el post')
      })
    })
  }

  darLike() {

      if(this.props.post.likes.includes(auth.currentUser.uid)) {
        db
        .collection('posts')
        .doc(this.props.post.id)
        .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid)
        })
        .then()
        .catch(error => console.log('error al cargar el like'))  
      }else {
        db
          .collection('posts')
          .doc(this.props.post.id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
          })
          .then()
          .catch(error => console.log('error al cargar el like'))
      }
  }

  render() {
    const navigation = this.props.navigation;
    console.log('this.props.navigation', this.props.navigation);
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
        <Image
            style={styles.image}
            source={{ uri: this.props.post.photo }}
            resizeMethod="resize"
            resizeMode="cover"
            alt="alt"
            />

          {auth.currentUser.uid === this.props.post.userId && 
            <View>
              <TouchableOpacity>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deletePost(this.props.post.id, this.props.post.photo)}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
              </View>
            }
              <View>
                <TouchableOpacity onPress={() => this.darLike()}>
                  <View>
                     
                    <AntDesign name="like1" size={24} color={this.props.post.likes.includes(auth.currentUser.uid)? 'red': 'gray'} />
                    <Text>{this.props.post.likes.length}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("Comments", { post: this.props.post })}
                }> 
                  <Text>Comentarios {this.props.post.comments.length}</Text>
                </TouchableOpacity>
              </View>
          
            </View>  
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: 150,
        border: "1px solid black",
        borderRadius: 10,
        padding: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        height: 100,

    },
});
export default PostItemList;
