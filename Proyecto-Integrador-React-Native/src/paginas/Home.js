import React, {Component} from "react";
import { View , Text , TouchableOpacity , TextInput , StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Home extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    logout(){
        auth.signOut();
        //redirigir al usuario a la home page 
        // this.props.navigation.navigator('Login')
    }

    render(){
        return(
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;