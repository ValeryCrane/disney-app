import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Header from "../Elements/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { importCommentsInfo, importGroupsInfo, exportCommentsInfo, exportGroupsInfo } from "../AsyncStorage";

const groupsCloudKey = "GROUPS_CLOUD";
const commentsCloudKey = "COMMENTS_CLOUD";

const saveDataInCloud = async () => {
    const groupsInfo = await exportGroupsInfo();
    const commentsInfo = await exportCommentsInfo();
    await setDoc(
        doc(db, 'app', 'users', auth.currentUser.uid, groupsCloudKey),
        { data: groupsInfo }
    )
    await setDoc(
        doc(db, 'app', 'users', auth.currentUser.uid, commentsCloudKey),
        { data: commentsInfo }
    )
}

const readDataFromCloud = async () => {
    const groupsQuerySnapshot = await getDoc(
        doc(db, 'app', 'users', auth.currentUser.uid, groupsCloudKey)
    );
    const commentsQuerySnapshot = await getDoc(
        doc(db, 'app', 'users', auth.currentUser.uid, commentsCloudKey)
    );
    if (groupsQuerySnapshot.exists()) {
        importGroupsInfo(groupsQuerySnapshot.data().data)
    }
    if (commentsQuerySnapshot.exists()) {
        importCommentsInfo(commentsQuerySnapshot.data().data)
    }
}

export default function CloudSettingsScreen({ navigation }) {

    const handleDownloadData = () => {
        readDataFromCloud()
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    const handleUploadData = () => {
        saveDataInCloud()
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    const handleLogout = () => {
        Promise.all([
            importCommentsInfo(null),
            importGroupsInfo(null),
            signOut(auth)
        ]).then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                });
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    return (
        <View style={{flex: 1}}>
            <Header title={'Cloud'}/>

            <TouchableOpacity 
                style={styles.settingWrapper} 
                onPress={() => handleDownloadData()}>
                <AntDesign name="clouddownload" size={24} color="black" />
                <Text style={styles.settingTitle}>Download cloud data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.settingWrapper} 
                onPress={() => handleUploadData()}>
                <AntDesign name="cloudupload" size={24} color="black" />
                <Text style={styles.settingTitle}>Upload cloud data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.settingWrapper} 
                onPress={() => handleLogout()}>
                <AntDesign name="logout" size={24} color="black" />
                <Text style={styles.settingTitle}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.settingWrapper} 
                onPress={() => {}}>
                <AntDesign name="deleteuser" size={24} color="#f55" />
                <Text style={[styles.settingTitle, {color: "#f55"}]}>Delete account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    settingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 16,
        paddingRight: 16
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 32
    }
})
