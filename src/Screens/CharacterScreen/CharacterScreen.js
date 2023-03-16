import React, { createRef, useRef } from "react";
import { View, StyleSheet, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet';
import CommentPopup from "./Popups/CommentPopup";
import GroupPopup from "./Popups/GroupPopup";
import Header from "../../Elements/Header";

const backgroundImageSource = require('../../../assets/disney-background.jpg')

const propertiesTitles = {
    films: "Films",
    shortFilms: "Short films",
    tvShows: "TV shows",
    videoGames: "Video games",
    parkAttractions: "Park Attractions",
    allies: "Allies",
    enemies: "Enemies"
}


export default function CharacterScreen({ route }) {

    const character = route.params
    const safeArea = useSafeAreaInsets()

    const groupPopupRef = useRef(null)
    const commentPopupRef = useRef(null);

    const prepareProperties = (character) => {
        return Object.keys(character).map((key) => {
            if (propertiesTitles.hasOwnProperty(key)) {
                if (Array.isArray(character[key]) && character[key].length !== 0) {
                    return {
                        title: propertiesTitles[key], 
                        description: character[key].join(', ')
                    }
                } else if (!Array.isArray(character[key])) {
                    return {
                        title: propertiesTitles[key], 
                        description: character[key]
                    }
                }
            }
            return null;
        }).filter(Boolean)
    }

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={backgroundImageSource}
            blurRadius={3}
        >
        <LinearGradient
            colors={['#ffffff00', '#eeeeee', '#eeeeee']}
            style={styles.gradient}
        > 
            <Header title={''} showBackButton transparent />
            <ScrollView>
                <Image
                    style={styles.avatar}
                    source={{uri: character.imageUrl}}
                />
                <Text style={styles.characterName}>
                    {character.name}
                </Text>
                <FlatList scrollEnabled={false}
                    data={prepareProperties(character)}
                    renderItem={({ item }) => {
                        return <View>
                            <Text style={styles.propertyTitle}>{item.title}</Text>
                            <Text style={styles.propertyDescription}>{item.description}</Text>
                        </View>
                    }}
                />
            </ScrollView>
            <View style={[styles.topRightCorner, {top: 16 + safeArea.top}]}>
                <TouchableOpacity 
                    style={styles.listsButton} 
                    activeOpacity={1}
                    onPress={() => {
                        groupPopupRef.current.snapToIndex(0)
                        commentPopupRef.current.close()
                    }}
                >
                    <AntDesign name="staro" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.listsButton} 
                    activeOpacity={1}
                    onPress={() => {
                        groupPopupRef.current.close()
                        commentPopupRef.current.snapToIndex(0)
                    }}
                >
                    <AntDesign name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <BottomSheet
                enablePanDownToClose
                keyboardBehavior='extend'
                ref={groupPopupRef}
                snapPoints={[300, '90%']}
                index={-1}
            ><GroupPopup character={character} /></BottomSheet>
            <BottomSheet
                enablePanDownToClose
                keyboardBehavior='extend'
                ref={commentPopupRef}
                snapPoints={[300, '90%']}
                index={-1}
            ><CommentPopup character={character} /></BottomSheet>
        </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    test: {
        height: 50,
        backgroundColor: 'red'
    },
    backgroundImage: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    avatar: {
        width: '50%',
        height: 250,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 16,
        marginTop: 150
    },
    characterName: {
        fontSize: 32,
        fontWeight: 700,
        alignSelf: 'center',
        margin: 32,
        textAlign: 'center'
    },
    propertyTitle: {
        fontSize: 24,
        fontWeight: 700,
        alignSelf: 'center',
        margin: 8
    },
    propertyDescription: {
        fontSize: 20,
        alignSelf: 'center',
        margin: 8
    },
    listsButton: {
        width: 56,
        height: 56,
        margin: 4,
        borderRadius: 28,
        backgroundColor: '#ff7a59',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topRightCorner: {
        position: 'absolute',
        top: 16,
        right: 16,
    }
})