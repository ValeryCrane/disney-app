import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

export default function CharacterItem({ character, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={styles.image} source={{uri: character.imageUrl}}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 8,
        height: '100%',
        width: '100%',
        backgroundColor: '#ccc'
    }
})