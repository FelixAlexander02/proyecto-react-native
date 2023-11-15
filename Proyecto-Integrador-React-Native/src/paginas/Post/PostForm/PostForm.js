import react, { Component } from "react";
import { db, auth } from "../../../firebase/config";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Camara from "../../../components/Camera/Camera";

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      textoPost: "",
      showCamara: false,
      photoText: "",
      errors: [],
    };
  }

  postear() {
    if (!this.state.textoPost) {
      this.setState({
        errors: [...this.state.errors, "El texto del post es obligatorio"],
      });
    }

    if(!this.state.photoText) {
      this.setState({
        errors: [...this.state.errors, "La foto es obligatoria"],
      });
    }

    if(this.state.errors.length === 0){
        db.collection("posts")
        .add({
            texto: this.state.textoPost,
            photo: this.state.photoText,
            userId: auth.currentUser.uid,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: [],
        })
        .then(() => {
            this.setState({ textoPost: "", photoText: "" });
            this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Nuevo Post</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ textoPost: text })}
          placeholder="Escribir.."
          keyboardType="default"
          value={this.state.textoPost}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.setState({ showCamara: this.state.showCamara ? false : true })
          }
        >
          <Text style={styles.textButton}>Subir foto</Text>
        </TouchableOpacity>

        {this.state.showCamara && (
          <Camara
            setPhotoText={(text) => {
              this.setState({ photoText: text });
            }}
            firebaseUrlToStore="photos/posts/post"
            onFotoSacada={() => {
              this.setState({ showCamara: false });
            }}
          />
        )}

        <TouchableOpacity style={styles.button}
        onPress={() => this.postear()}
        >
          <Text style={styles.textButton}>Postear</Text>
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
  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  textButton: {
    color: "#fff",
  },
});

export default PostForm;
