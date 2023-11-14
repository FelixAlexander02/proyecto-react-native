import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from '../../paginas/Home';
import PostForm from '../../paginas/PostForm/PostForm';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Tab.Screen name='Nuevo Post' component={PostForm} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default Menu;
