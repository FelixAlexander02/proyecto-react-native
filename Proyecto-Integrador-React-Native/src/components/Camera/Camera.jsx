import React, { Component } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { storage } from "../../firebase/config";

import {
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
class Camara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      showCamera: false,
      photo: "",
    };
  }

  sacarFoto() {
    
    this.metodosDeCamara.takePictureAsync()
        .then((photo) => {
          this.setState({
            photo: photo.uri,
            showCamera: false,
          });
          console.log("foto uri ", photo);
        })
        .catch((error) => {
          console.log(error);
        });
    
  }

  clearFoto() {
    this.setState({
      photo: "",
      showCamera: true,
    });
  }

  guardarFoto(){
    fetch(this.state.photo)
        .then(res => res.blob())
        .then(imagen => {
            // cremos una referencia vacia a un punto del storage remoto
            const referenciaAlStorage = storage.ref(`photos/post-${Date.now().png}`)
            
            // cargamos la imagen en esa referencia
            referenciaAlStorage.put(imagen)
                .then((url) => {
                    console.log(url)
                    alert('imagen guardada')
                    this.clearFoto()
                    // hace algo con la imagen guardada, almacenarla en el post del usuario por ejemplo
                })
        })
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then(() => {
        this.setState({
          permission: true,
          showCamera: true,
        });
        console.log("tiene permisos");
      })
      .catch((e) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={style.container}>
        {this.state.showCamera && // si show camera esta en true muestra el fragmento
          <React.Fragment>
            <Camera
              style={style.camera}
              type={Camera.Constants.Type.back}
              ref={(metodosDeCamara) =>
                (this.metodosDeCamara = metodosDeCamara)
              }
            />
            <TouchableOpacity
              onPress={() => this.sacarFoto()}
              style={style.btnCapture}
            >
              <Ionicons name="radio-button-on-sharp" size={66} color="white" />
            </TouchableOpacity>
          </React.Fragment>
        }

        {this.state.photo && // si photo tiene un valor muestra el fragmento
          <React.Fragment>
            <Image style={style.image} source={{ uri: this.state.photo }} />
            
            {/* opciones guardar y eliminar */ }
            <View style={style.checksDiv}>
              <TouchableOpacity onPress={() => this.clearFoto()}>
                <Ionicons name="md-trash-sharp" size={40} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.guardarFoto()}>
                <AntDesign name="checkcircle" size={40} color="green" />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  camera: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  btnCapture: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  btnOff: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  checksDiv: {
    padding: '2rem',
    position: "absolute",
    flexDirection: "row",
    flex: 2,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Camara;
