import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
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

    const provideCharacterList = () => {
        if (characters.length === 0) {
            return (
                <View style={styles.noCharactersLabelWrapper}>
                    <Text style={styles.noCharactersLabel}>No characters in this group</Text>
                </View>
            )
        } else {
            return (
                <ListOfCharacters 
                    characters={characters}
                    onPress={(character => {
                        navigation.navigate("Character", character)
                    })}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header title={groupTitle} />

            {provideCharacterList()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noCharactersLabelWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    noCharactersLabel: {
        opacity: 0.75
    }
})
