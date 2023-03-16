import React, { useEffect, useRef } from "react";
import { StyleSheet, Modal, Animated, View } from "react-native";
import { Easing } from "react-native-reanimated";

export default function HUD({ isActive }) {
    const spinValue = useRef(new Animated.Value(0)).current
    const opacityValue = useRef(new Animated.Value(0)).current

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        spinValue.setValue(0)
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start()
    }, [isActive])

    return (
        <Modal visible={isActive} transparent={true}>
            <View style={styles.modal}>
            <Animated.View style={[styles.container]}>
                <Animated.Image 
                    source={require('../../assets/mickey-logo.png')} 
                    style={{transform: [{rotate: spin}], height: 64, width: 64 }}
                    />
            </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: 128,
        width: 128,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 64,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.5
    }
})