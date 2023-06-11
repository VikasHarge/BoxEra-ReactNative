import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../type";
import Home from "../Screens/HomeTab/Home";
import BoxDetailsInput from "../Screens/HomeTab/BoxDetailsInput";
import CostDetailsInput from "../Screens/HomeTab/CostDetailsInput";
import ColorDetailsInput from "../Screens/HomeTab/ColorDetailsInput";
import FinalDetails from "../Screens/HomeTab/FinalDetails";
import PaperDetailsInput from "../Screens/HomeTab/PaperDetailsInput";
import SelectClient from "../Screens/HomeTab/SelectClient";






const Stack = createNativeStackNavigator<HomeStackParamsList>()




const HomeStackNavigator = ()=>{


    return (
        <Stack.Navigator
        screenOptions={{
            animation : "slide_from_right",
            fullScreenGestureEnabled : true,
            headerStyle : {
                backgroundColor : '#DFDFDF'
            }
        }}

        >
            <Stack.Screen
            options={{
            
            }}
             name="Home" component={Home} />
            <Stack.Screen name="BoxDetailsInput" component={BoxDetailsInput} />
            <Stack.Screen name="CostDetailsInput" component={CostDetailsInput} />
            <Stack.Screen name="ColorDetailsInput" component={ColorDetailsInput} />
            <Stack.Screen name="FinalDetails" component={FinalDetails} />
            <Stack.Screen name="PaperDetailsInput" component={PaperDetailsInput} />
            <Stack.Screen options={{
                headerTitle : "Select Client"
            }} name="SelectClient" component={SelectClient} />
        </Stack.Navigator>
    )
}


export default HomeStackNavigator