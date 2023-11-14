import react, {Component} from 'react';
import { db , auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:''
        }
    }

    componentDidMount(){
        console.log("Chequear si el usuario esta logueado en firebase.");
        //Puse la funcionalidad aca para probarla. No necesariamente debe ir en este componente.

        auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                //redirigir al usuario a la home del sitio
                this.props.navigation.navigate('Home')
            }
        })
    }
    
    register(email, pass, userName){
    auth.createUserWithEmailAndPassword(email , pass)
      .then(()=>{
        console.log('Registrado Ok');

        //Cambiar los estados a vacio como estan al inicio 

        db.collection('users').add({
            owner: auth.currentUser.email,
            userName: userName,
            createdAt: Date.now(),  //crea fecha en el momento que esta ejecutandose 
        })
        .then( res => console.log(res) )

      })
      .catch(error=>{
        console.log(error);
      })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                    <Text>Ya tengo cuenta. Ir al login</Text>
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
        backgroundColor:'#8E44AD',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#8E44AD'
    },
    textButton:{
        color: '#fff'
    }

})


export default Register;