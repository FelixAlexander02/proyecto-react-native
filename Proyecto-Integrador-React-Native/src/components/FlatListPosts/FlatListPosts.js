import { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import PostItemList from "../../paginas/Post/PostItemList/PostItemList";

class FlatListPosts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatList
        data={this.props.posts}
        renderItem={({ item }) => (
          <PostItemList post={item} navigation={this.props.navigation} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>No hay posteos</Text>}
      />
    );
  }
}

export default FlatListPosts;
