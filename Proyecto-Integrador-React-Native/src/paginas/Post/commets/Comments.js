import React, { Component } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, VirtualizedList } from "react-native";
import { db, auth } from "../../../firebase/config";
import firebase from "firebase";

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            isLoading: true,
            comment: '',
            buttonCommentIsActive: false
        }
    }

    comentar() {
        if(this.state.comment !== ''){
            db.collection('comments').add(
                {
                    userId: auth.currentUser.uid,
                    text: this.state.comment,
                    createdAt: Date.now(),
                    userName: auth.currentUser.displayName,
                    userEmail: auth.currentUser.email,
                }
            )
            .then((commentDoc)=> {
                db.collection('posts').doc(this.props.route.params.post.id)
                .update({
                    comments: firebase.firestore.FieldValue.arrayUnion(commentDoc.id)
                })
                .then(() => {
                    console.log('agregado comentario')
                })
                .catch(error => console.log(error.message))
            })
            .catch(error => {
                alert('error al cargar el comentario')
            })
        }else {
            alert('debe ingresar un comentario')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.comment !== this.state.comment) {
            if(this.state.comment.length > 0) {
                this.setState({buttonCommentIsActive: true})
            }else {
                this.setState({buttonCommentIsActive: false})
            }
        }
    }

    componentDidMount() {
        if(this.props.route.params.post.comments.length === 0) {
            this.setState({isLoading: false})
            return
        }

        db.collection('comments')
            .where('id', 'in', this.props.route.params.post.comments)
            .onSnapshot(snap => {
                const comments = snap.docs.map(doc => {
                    return {
                        id: doc.id,
                        text: doc.data().text,
                        userId: doc.data().userId,
                        userName: doc.data().userName,
                        userEmail: doc.data().userEmail,
                        createdAt:doc.data().createdAt
                    }
                })
                this.setState({comments: comments, isLoading: false})
            })
    }
    render() {
        console.log('comentarios', this.state.comments.length)
        return (
            <View>
                <Text>Comentarios del post numero {this.props.route.params.post.id}</Text>
                {this.state.isLoading? 
                    <ActivityIndicator color={'blue'} />
                    
                    : 
                    <View>
                        {this.state.comments.length === 0? 
                            <Text>No hay comentarios cargados, se el primero"</Text>
                            : 
                            <React.Fragment>
                                <Text>Lista de comentarios</Text>
                            </React.Fragment>
                        }
                        <View>
                            <TextInput placeholder="ingresa un comentario" onChangeText={(text) => {
                                this.setState({comment: text})
                            }}/>
                            <TouchableOpacity 
                                disabled={!this.state.buttonCommentIsActive} 
                                onPress={() => {
                                this.comentar()
                            }}>
                                <Text>Commentar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }    
            </View>
        )
    }
}

export default Comments