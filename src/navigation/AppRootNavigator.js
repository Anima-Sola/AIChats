import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainChatScreen from "../screens/MainChatScreen";

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }}>
                <AppRootNavigator.Screen 
                    name = "MainChatScreen"
                    component = { MainChatScreen }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}
