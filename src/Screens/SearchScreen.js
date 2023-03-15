import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import SearchHeader from "../Elements/SearchHeader";
import ListOfCharacters from "../Elements/ListOfCharacters";

// URL для запросов поиска персонажей.
const ALL_CHARACTERS_URL = 'https://api.disneyapi.dev/characters'
const SEARCH_URL = 'https://api.disneyapi.dev/character?name='

// Экран с возможностью поиска персонажей.
export default function SearchScreen({ navigation }) {
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
            
            <TouchableOpacity style={styles.cloudButton} activeOpacity={1} onPress={() => {
                navigation.navigate('CloudSettings')
            }}>
                <AntDesign name="cloud" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listButton} activeOpacity={1} onPress={() => {
                navigation.navigate('Groups')
            }}>
                <Entypo name="list" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listButton: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ff7a59',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cloudButton: {
        position: 'absolute',
        bottom: 32,
        left: 32,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ff7a59',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityIndicator: {
        flex: 1
    }
})
