import React, {Component} from "react";
import { View , Text , TouchableOpacity , FlatList, TextInput , StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import PostItemList from "./Post/PostItemList/PostItemList";

class Home extends Component{
    constructor(){
        super()
        this.state={
            myPosts: [],
            OtherPosts: [],

        }
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

    logout(){
        auth.signOut();
        //redirigir al usuario a la home page 
        // this.props.navigation.navigator('Login')
    }

    render(){
        console.log(this.state.myPosts)
        return(
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPress={()=>this.logout()}>-
                    <Text>Logout</Text>
                </TouchableOpacity>

                <View>
                    <View>
                        <Text>Mis Posts</Text>
                        {this.state.myPosts.length === 0? 
                            <Text>No hay posts</Text>
                            :
                            <View>
                                {this.state.myPosts.map(post => <PostItemList key={post.id} texto={post.texto} photo={post.photo} />)}
                                </View>
                        }
                    </View>

                </View>
            </View>
        )
    }
}

export default Home;

