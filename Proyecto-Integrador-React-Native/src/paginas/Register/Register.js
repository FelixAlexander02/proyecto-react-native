import react, { Component } from "react";
import { db, auth } from "../../firebase/config";
import {
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Camara from "../../components/Camera/Camera";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      bio: "",
      avatar: "",
      errors: [],
      showCamera: false,
    };
  
  }

  componentDidMount() {
    console.log("Chequear si el usuario esta logueado en firebase.");
    //Puse la funcionalidad aca para probarla. No necesariamente debe ir en este componente.

    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        //redirigir al usuario a la home del sitio
        this.props.navigation.navigate("Home");
      }
    });
  }



  register(email, pass, userName, bio) {
    this.setState({ errors: [] }); // antes de iniciar un registro limpiamos los errores
    if (!email) {
      this.setState({
        errors: [...this.state.errors, "EL email es obligatorio"],
      });
    }
    if (!pass) {
      this.setState({
        errors: [...this.state.errors, "EL password es obligatorio"],
      });
    }
    if (!userName) {
      this.setState({
        errors: [...this.state.errors, "EL userName es obligatorio"],
      });
    }

    if (email && pass && userName) {
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          console.log("Registrado Ok");

          //Cambiar los estados a vacio como estan al inicio

          const newUserData = {
            owner: auth.currentUser.email,
            userName: userName,
            bio: this.state.bio,
            avatar: this.state.avatar,
            createdAt: Date.now(), //crea fecha en el momento que esta ejecutandose
          }
          console.log('data', newUserData);
          
          db.collection("users")
            .add(newUserData)
            .then((res) => {
                console.log(res)
            });

            // catch de almacenamiento de datos
            }).catch((error) => {
            console.log(error);
            })
        // catch de registro de usuario
        .catch((error) => {
          console.log(error);
        });
    }
  }
  


  render() {
    return (
      <View style={styles.formContainer}>
        {this.state.errors.length != 0 && (
          <View>
            {/* mensajes de error si existen */}
            {this.state.errors.map((error) => (
              <Text>{error}</Text>
            ))}
          </View>
        )}
        <Text>Registrarse</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="email"
          keyboardType="email-address"
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ userName: text })}
          placeholder="user name"
          keyboardType="default"
          value={this.state.userName}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="password"
          keyboardType="default"
          secureTextEntry={true}
          value={this.state.password}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ bio: text })}
          placeholder="bio"
          keyboardType="default"
          //multiline={true}
          //numberOfLines={4}
          value={this.state.bio}
        />
        
        <Button
          style={styles.button}
         onPress={() => this.setState({showCamera: this.state.showCamera? false : true})}
         title="Sacar Foto"
        >
        </Button>

        {this.state.showCamera && 
        <Camara
             setPhotoText={(text)=> {this.setState({avatar: text})}} 
            firebaseUrlToStore="photos/user/avatar"
            onFotoSacada= {
                () => {
                    this.setState({showCamera: false})
                }
            }
        />}
        
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.register(
              this.state.email,
              this.state.password,
              this.state.userName,
              this.state.bio
            )
          }
        >
          <Text style={styles.textButton}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>Ya tengo cuenta. Ir al login</Text>
        </TouchableOpacity>
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
});

export default Register;
