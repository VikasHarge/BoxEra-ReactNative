
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootNavigatorParamList } from '../type';
import HomeStackNavigator from '../HomeStackNavigator';
import Clients from '../Screens/ClientScreen';
import ClientScreen from '../Screens/ClientScreen';
import UserScreen from '../Screens/UserScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native'




const Tab = createBottomTabNavigator<RootNavigatorParamList>()




const BottomTabsNavigator = () => {



    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    minHeight: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: "black",

                },
                tabBarLabelStyle: {
                    fontSize: 15,
                },
                headerTitle: () => (
                    <View style={{
                        display: 'flex',
                        flexDirection: "row",
                        gap: 10,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }} >
                        <Ionicons
                            name={"cube"}
                            color="#0C315A"
                            size={40}
                        />
                        <View>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: "900",
                                color: "black"
                            }} >BoxEra</Text>
                            <Text style={{
                                color: "grey",

                            }} >By Swaminarayan industries</Text>
                        </View>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: "#ffff",
                }
            }}



        >
            <Tab.Screen
                options={{
                    headerShown: true,
                    tabBarLabel: "BoxEra",
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "cube" : "cube-outline"}
                            color={color}
                            size={focused ? 30 : 25}
                        />
                    )
                }}
                name='HomeStack' component={HomeStackNavigator} />
            <Tab.Screen
                options={{
                    tabBarLabel: "Clients",
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "people" : "people-outline"}
                            color={color}
                            size={focused ? 30 : 25}
                        />
                    ),


                }}
                name='Clients'
                component={ClientScreen} />


            <Tab.Screen options={{
                tabBarLabel: "Users",
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons
                        name={focused ? "settings" : "settings-outline"}
                        color={color}
                        size={focused ? 30 : 25}
                    />
                )
            }} name='Users' component={UserScreen} />
        </Tab.Navigator>
    )
}


export default BottomTabsNavigator