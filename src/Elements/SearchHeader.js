import React from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput, StatusBar, Platform } from "react-native";

export default function SearchHeader({ onSearchSubmit }) {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Disney</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={'Search'}
                    onSubmitEditing={(event) => onSearchSubmit(event.nativeEvent.text)}
                />
            </View>
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
    wrapper: {
        padding: 16,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: 600
    },
    input: {
        flex: 1,
        padding: 4,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4
    }
})