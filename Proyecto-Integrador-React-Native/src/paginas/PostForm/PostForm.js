import react, {Component} from 'react';
import { db , auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
            textoPost:'',
        }
    }


    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Nuevo Post</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir..'
                    keyboardType='default'
                    value={this.state.textoPost}/>
             
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})



export default PostForm;