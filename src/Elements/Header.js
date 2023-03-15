import React from "react";
import { StyleSheet, SafeAreaView, Text, StatusBar, Platform } from "react-native";

export default function Header({ title }) {
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.title}>{title}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 3,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    title: {
        padding: 16,
        fontSize: 24,
        fontWeight: 600,
        alignSelf: 'center'
    }
})