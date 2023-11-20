import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { db, auth } from "../../../firebase/config";
import firebase from "firebase";
import CommentItem from "./ComentItem";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsInPost: this.props.route.params.post.comments,
      isLoading: true,
      comment: "",
      buttonCommentIsActive: false,
    };
  }

  cargarComments() {
    this.setState({ isLoading: true, comments: [] })
    db.collection("posts").doc(this.props.route.params.post.id).onSnapshot((snap) => {
      this.setState({ commentsInPost: snap.data().comments });
    })
    
    if (this.props.route.params.post.comments.length === 0) {
      this.setState({ isLoading: false });
      return;
    }

    db.collection("comments")
      .where(firebase.firestore.FieldPath.documentId(), "in", this.state.commentsInPost)
      //.orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        console.log("snap", snap.docs);
        const comments = snap.docs.map((doc) => {
          return {
            id: doc.id,
            text: doc.data().text,
            userId: doc.data().userId,
            userName: doc.data().userName,
            userEmail: doc.data().userEmail,
            createdAt: doc.data().createdAt,
          };
        });
        const commentsSortByCreatedAt = comments.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
        this.setState({ comments: commentsSortByCreatedAt, isLoading: false });
      });
    }

  comentar() {
    if (this.state.comment !== "") {
      db.collection("comments")
        .add({
          userId: auth.currentUser.uid,
          text: this.state.comment,
          createdAt: Date.now(),
          userName: auth.currentUser.displayName,
          userEmail: auth.currentUser.email,
        })
        .then((commentDoc) => {
          db.collection("posts")
            .doc(this.props.route.params.post.id)
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(commentDoc.id),
            })
            .then(() => {
              this.cargarComments()
            })
            .catch((error) => console.log(error.message));
        })
        .catch((error) => {
          alert("error al cargar el comentario");
        });
    } else {
      alert("debe ingresar un comentario");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.comment !== this.state.comment) {
      if (this.state.comment.length > 0) {
        this.setState({ buttonCommentIsActive: true });
      } else {
        this.setState({ buttonCommentIsActive: false });
      }
    }
  }

  componentDidMount() {
    this.cargarComments();
  }
  render() {

    console.log("comentarios", this.state.comments.length);
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>
          Comentarios del post
        </Text>
        {this.state.isLoading ? (
          <ActivityIndicator color={"blue"} />
        ) : (
          <View>
            <FlatList
              style={styles.commentsContainer}
              data={this.state.comments}
              renderItem={(item) => 
                <CommentItem comment={item.item} navigation={this.props.navigation} />
              }
              ListEmptyComponent={() => (
                <Text>No hay comentarios cargados, se el primero"</Text>
              )}
              keyExtractor={(item) => item.id}
            />

            <View>
              <TextInput 
                style={styles.input}
                placeholder="ingresa un comentario"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
              />
              <TouchableOpacity
                style={styles.button}
                disabled={!this.state.buttonCommentIsActive}
                onPress={() => {
                  this.comentar();
                }}
              >
                <Text style={styles.textButton}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
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
  commentsContainer: {
    padding: 30
  },
  titulo: {
    fontSize: 20,

  }
});

export default Comments;
