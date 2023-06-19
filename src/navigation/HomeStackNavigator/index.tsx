import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../type";
import Home from "../Screens/HomeTab/Home";
import BoxDetailsInput from "../Screens/HomeTab/BoxDetailsInput";
import CostDetailsInput from "../Screens/HomeTab/CostDetailsInput";
import FinalDetails from "../Screens/HomeTab/FinalDetails";
import PaperDetailsInput from "../Screens/HomeTab/PaperDetailsInput";
import SelectClient from "../Screens/HomeTab/SelectClient";
import BoxEdit from "../Screens/HomeTab/BoxEdit";






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
            <Stack.Screen name="BoxDetailsInput" options={{
                title : "Box Estimation"
            }} component={BoxDetailsInput} />
            <Stack.Screen name="CostDetailsInput" component={CostDetailsInput} />
            <Stack.Screen name="BoxEdit" options={{
                title : "Edit Estimation"
            }} component={BoxEdit} />
            <Stack.Screen name="FinalDetails" options={{
                title : "Box Details"
            }} component={FinalDetails} />
            <Stack.Screen name="PaperDetailsInput" component={PaperDetailsInput} />
            <Stack.Screen options={{
                headerTitle : "Select Client"
            }} name="SelectClient" component={SelectClient} />
        </Stack.Navigator>
    )
}


export default HomeStackNavigator