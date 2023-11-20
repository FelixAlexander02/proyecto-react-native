import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { db, auth } from "../../../firebase/config";
import firebase from "firebase";
import CommentItem from "./ComentItem";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isLoading: true,
      comment: "",
      buttonCommentIsActive: false,
    };
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
              console.log("agregado comentario");
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
    if (this.props.route.params.post.comments.length === 0) {
      this.setState({ isLoading: false });
      return;
    }

    db.collection("comments")
      .where(firebase.firestore.FieldPath.documentId(), "in", this.props.route.params.post.comments)
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
  render() {

    

    console.log("comentarios", this.state.comments.length);
    return (
      <View>
        <Text>
          Comentarios del post numero {this.props.route.params.post.id}
        </Text>
        {this.state.isLoading ? (
          <ActivityIndicator color={"blue"} />
        ) : (
          <View>
            <FlatList
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
                placeholder="ingresa un comentario"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
              />
              <TouchableOpacity
                disabled={!this.state.buttonCommentIsActive}
                onPress={() => {
                  this.comentar();
                }}
              >
                <Text>Commentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Comments;
