import { Component } from "react";
import { View , Text , TouchableOpacity , FlatList, TextInput , StyleSheet } from 'react-native';
import PostItemList from "../../paginas/Post/PostItemList/PostItemList";

class FlatListPosts extends Component {
    constructor(props){
        super(props)
    }


    render() {
        return(
            <View style={styles.container}>
                {
                    this.props.posts.length === 0?
                    <View>
                        <Text>No hay posts</Text>
                    </View>
                    :
                    <FlatList style={styles.list} 
                        data={this.props.posts}
                        renderItem={({item}) => <PostItemList post={item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    list: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})

export default FlatListPosts