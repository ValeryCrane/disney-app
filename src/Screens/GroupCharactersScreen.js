import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import Header from "../Elements/Header";
import ListOfCharacters from "../Elements/ListOfCharacters";
import { getGroupCharacters } from "../AsyncStorage";

export default function GroupCharactersScreen({ navigation, route }) {
    const groupTitle = route.params.groupTitle
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGroupCharacters(groupTitle).then((characters) => setCharacters(characters));
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{flex: 1}}>
            <Header title={groupTitle} />

            <ListOfCharacters 
                characters={characters}
                onPress={(character => {
                    navigation.navigate("Character", character)
                })}
            />
        </View>
    )
}
