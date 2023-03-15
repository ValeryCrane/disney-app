import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./Screens/SearchScreen";
import CharacterScreen from "./Screens/CharacterScreen/CharacterScreen";
import GroupsScreen from "./Screens/GroupsScreen";
import GroupCharactersScreen from "./Screens/GroupCharactersScreen";
import AuthScreen from "./Screens/AuthScreen";
import CloudSettingsScreen from "./Screens/CloudSettingsScreen";


const Stack = createStackNavigator();

export default function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Auth' component={AuthScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
                <Stack.Screen name='CloudSettings' component={CloudSettingsScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Character' component={CharacterScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Groups' component={GroupsScreen} options={{headerShown: false}} />
                <Stack.Screen name='GroupCharacters' component={GroupCharactersScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}