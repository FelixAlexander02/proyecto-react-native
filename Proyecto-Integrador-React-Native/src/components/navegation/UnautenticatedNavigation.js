import { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../paginas/Register/Register";
import Login from "../../paginas/Login/Login";


const Stack = createNativeStackNavigator();

class UnautenticatedNavigation extends Component {
    constructor(props){
        super(props)

    }

    render() {
        return(
            <Stack.Navigator>
                <Stack.Group>
                    <Stack.Screen name='Registro' component={Register} options={{headerShown: false}} />
                    <Stack.Screen name='Login' component={Login}  options={{headerShown: false}}/>            
                </Stack.Group>
            </Stack.Navigator>
        )
    }
}

export default UnautenticatedNavigation;