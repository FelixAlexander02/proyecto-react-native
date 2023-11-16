import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../paginas/Home";
import Camara from "../Camera/Camera";
import Perfil from "../../paginas/Perfil/Perfil";
import PostForm from "../../paginas/Post/PostForm/PostForm";

const Tab = createBottomTabNavigator();

class AutenticatedNavigation extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Camara' component={Camara} />
                <Tab.Screen name='Post' component={PostForm} />
                <Tab.Screen name='Perfil' component={Perfil} />
            </Tab.Navigator>
        )
    }
}

export default AutenticatedNavigation;