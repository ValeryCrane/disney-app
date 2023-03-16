import React from "react";
import { StyleSheet, SafeAreaView, Text, StatusBar, Platform, View, Touchable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({ title, showBackButton, transparent }) {
    const navigation = useNavigation()

    const provideBackButton = () => {
        if (showBackButton) {
            return (
                <View style={styles.backIconWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color={transparent ? 'white' : 'black'}/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
        }
        
    }

    return (
        <SafeAreaView style={transparent ? styles.transparentMain : styles.main}>
            <View style={styles.container}>
                {provideBackButton()}
                <Text style={styles.title}>{title}</Text>
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
    transparentMain: {
        backgroundColor: '#00000000',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    title: {
        padding: 16,
        fontSize: 24,
        fontWeight: 600,
        alignSelf: 'center'
    },
    container: {
        position: 'relative'
    },
    backIconWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 16,
        justifyContent: 'center'
    }
})