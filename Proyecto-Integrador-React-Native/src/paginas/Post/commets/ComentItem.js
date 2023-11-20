import { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class CommentItem extends Component {
    constructor(props) {
        super(props)
       
    }

    render() {
        console.log('this.props.comment', this.props.comment);
        return(
            <View>
                <Text>{this.props.comment.text}</Text>
                <Text>{this.props.comment.userName}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("PerfilPublico", {userEmail: this.props.comment.userEmail})}
                    >
                    <Text>{this.props.comment.userEmail}</Text>
                    </TouchableOpacity>
                <Text>{new Date(this.props.comment.createdAt).toUTCString()}</Text>
            </View>
        )       
    }
}

export default CommentItem