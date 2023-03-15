import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SearchHeader from "../Elements/SearchHeader";
import ListOfCharacters from "../Elements/ListOfCharacters";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// URL для запросов поиска персонажей.
const ALL_CHARACTERS_URL = 'https://api.disneyapi.dev/characters'
const SEARCH_URL = 'https://api.disneyapi.dev/character?name='
const CHARACTER_URL = 'https://api.disneyapi.dev/characters/'

// Экран с возможностью поиска персонажей.
export default function SearchScreen({ navigation }) {

    const safeArea = useSafeAreaInsets()

    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Обработка поискового запроса.
    const searchCharacters = (searchQuery) => {
        setIsLoading(true)
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
                setIsLoading(false)
            })
    }

    const goToRandomCharacter = () => {
        let url = CHARACTER_URL + Math.floor(Math.random() * 7397 + 130)
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                navigation.navigate("Character", {
                    ...json,
                    key: json._id
                })
            })
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

            {
                isLoading ?
                <ActivityIndicator style={{flex: 1}}/> : 
                <ListOfCharacters 
                    characters={characters}
                    onPress={(character => {
                        navigation.navigate("Character", character)
                    })}/>

            }
            
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
    }
})
