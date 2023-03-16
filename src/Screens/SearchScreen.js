import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SearchHeader from "../Elements/SearchHeader";
import ListOfCharacters from "../Elements/ListOfCharacters";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HUD from "../Elements/HUD";

// URL для запросов поиска персонажей.
const ALL_CHARACTERS_URL = 'https://api.disneyapi.dev/characters'
const SEARCH_URL = 'https://api.disneyapi.dev/character?name='
const CHARACTER_URL = 'https://api.disneyapi.dev/characters/'

// Экран с возможностью поиска персонажей.
export default function SearchScreen({ navigation }) {

    const safeArea = useSafeAreaInsets()

    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(false)
    const [randomLoading, setRandomLoading] = useState(false)

    // Обработка поискового запроса.
    const searchCharacters = (searchQuery) => {
        setLoading(true)
        let url
        if (searchQuery == '') {
            url = ALL_CHARACTERS_URL
        } else {
            url = SEARCH_URL + searchQuery
        }
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setCharacters(json.data.map((character) => {
                    return {
                        ...character,
                        key: character._id
                    }
                }))
                
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const goToRandomCharacter = () => {
        setRandomLoading(true)
        let url = CHARACTER_URL + Math.floor(Math.random() * 7397 + 130)
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                navigation.navigate("Character", {
                    ...json,
                    key: json._id
                })
            })
            .finally(() => {
                setRandomLoading(false)
            })
    }

    const provideCharacterList = () => {
        if (loading) {
            return <ActivityIndicator style={styles.activityIndicator}/>
        } else if (characters.length === 0) {
            return (
                <View style={styles.noCharactersLabelWrapper}>
                    <Text style={styles.noCharactersLabel}>No characters found</Text>
                </View>
            )
        } else {
            return (
                <ListOfCharacters 
                    characters={characters}
                    onPress={(character => {
                    navigation.navigate("Character", character)
                    })}/>
            )
        }
    }

    // Изначальный запрос поиска.
    useEffect(() => {
        searchCharacters('');
    }, [])

    return (
        <View style={styles.activityIndicator}>
            <SearchHeader onSearchSubmit={(text) => {
                console.log(text)
                searchCharacters(text)
            }} />

            {provideCharacterList()}

            <View style={[styles.bottomRightCorner, {bottom: 16 + safeArea.bottom}]}>
                <TouchableOpacity style={styles.cornerButton} activeOpacity={1} onPress={() => {
                    navigation.navigate('Groups')
                }}>
                    <Entypo name="list" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[styles.bottomLeftCorner, {bottom: 16 + safeArea.bottom}]}>
                <TouchableOpacity style={styles.cornerButton} activeOpacity={1} onPress={() => {
                    navigation.navigate('CloudSettings')
                }}>
                    <AntDesign name="cloud" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cornerButton} activeOpacity={1} onPress={() => {
                    goToRandomCharacter()
                }}>
                    <FontAwesome5 name="dice" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <HUD isActive={randomLoading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    cornerButton: {
        width: 56,
        height: 56,
        margin: 4,
        borderRadius: 28,
        backgroundColor: '#ff7a59',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    activityIndicator: {
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
