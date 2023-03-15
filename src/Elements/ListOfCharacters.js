import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from "react-native";
import CharacterItem from "./CharacterItem";

export default function ListOfCharacters({ characters, onPress, loadMore }) {
    return (
        <FlatList 
            style={styles.characterList}
            key={'3'}
            numColumns={'3'}
            data={characters}
            renderItem={({ item }) => {
                return <View style={styles.characterItem}>
                    <CharacterItem character={item} onPress={() => onPress(item)}/>
                </View>
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
        />
    )
}

const styles = StyleSheet.create({
    characterList: {
        display: 'flex'
    },
    characterItem: {
        flex: 1,
        height: 150,
        padding: 4,
        maxWidth: Dimensions.get('window').width / 3
    }
})
