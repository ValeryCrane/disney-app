import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import Header from "../Elements/Header";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import HUD from "../Elements/HUD";

// Экран авторизации в приложении
export default function AuthScreen({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // При изменении статуса авторизации переходим на экран поиска.
        let unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Search' }],
                });
            }
        })

        return unsubscribe
    }, [])

    // Обработка входа.
    const handleLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                setLoading(false)
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
            })
            .catch(error => {
                setLoading(false)
                Alert.alert(error.message)
            })
    }

    // Обработка регистрации.
    const handleRegister = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                setLoading(false)
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
            })
            .catch(error => {
                setLoading(false)
                Alert.alert(error.message)
            })
    }

    return (
        <View style={styles.container}>
            <Header title={"Authorization"} />
            <View style={styles.content}></View>
            <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={'E-mail'} 
                    onChangeText={(text) => setEmail(text)}/>
                <TextInput
                    secureTextEntry={true} 
                    style={styles.textInput} 
                    placeholder={'Password'} 
                    onChangeText={(text) => setPassword(text)}/>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
            <HUD isActive={loading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1
    },
    form: {
        width: '80%',
        marginLeft: '10%'
    },
    textInput: {
        height: 48,
        backgroundColor: '#eee',
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOpacity: 0.05,
        textAlign: 'center',
        borderRadius: 16,
        fontSize: 16,
        margin: 4
    },
    buttonWrapper: {
        marginTop: 32,
        marginBottom: 32
    },
    button: {
        height: 48,
        backgroundColor: '#ff7a59',
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOpacity: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        margin: 4
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
})
