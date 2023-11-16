import { View, Text, Image, TextInput, StyleSheet } from "react-native"
import { storage } from "../../../firebase/config"
import { Component } from "react";

class PostItemList extends Component {
    constructor(props){
        super(props)
        this.state = {
            photo: ''
        }
    }
    
    componentDidMount() {
        storage.ref().child(this.props.photo).getDownloadURL()
            .then(url => {
                this.setState({photo: url})
            })
    }

    render() {
        
        return(
            <View style={styles.container}>
                <Text>{this.props.texto}</Text>
                <Image source={{uri: this.state.photo}} />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    }
})
export default PostItemList;