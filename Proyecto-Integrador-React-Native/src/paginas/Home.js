import React, {Component} from "react";
import { View , Text , TouchableOpacity , FlatList, TextInput , StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import FlatListPosts from "../components/FlatListPosts/FlatListPosts";

class Home extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state={
            recentPosts: [],
        }
    }

    componentDidMount() {

        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snap => {
                const recentPosts = snap.docs.map( doc => {
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
                this.setState({recentPosts})
            })
    }

    logout(){
        auth.signOut();
        //redirigir al usuario a la home page 
        // this.props.navigation.navigator('Login')
    }

    render(){
        return(
            <View style={styles.container}>
                
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            
                <View style={styles.containerPost}>
                    <View>
                        <Text>Posts Recientes</Text>
                       <FlatListPosts posts={this.state.recentPosts} navigation={this.props.navigation} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height:'100%'
    },
    containerPost: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
    },
    containerPostSection: {
        width: '25em',
        height: '100em',
    }
})

export default Home;

