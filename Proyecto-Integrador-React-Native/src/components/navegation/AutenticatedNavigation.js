import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../paginas/Home";
import Perfil from "../../paginas/Perfil/Perfil";
import PostForm from "../../paginas/Post/PostForm/PostForm";
import Buscador from "../../paginas/Buscador/Buscador";

const Tab = createBottomTabNavigator();

class AutenticatedNavigation extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Post' component={PostForm} />
                <Tab.Screen name="Buscador" component={Buscador} />
                <Tab.Screen name='Perfil' component={Perfil} />
            </Tab.Navigator>
        )
    }
}

export default AutenticatedNavigation;