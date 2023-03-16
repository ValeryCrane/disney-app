import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { getGroupList } from "../AsyncStorage";
import Header from "../Elements/Header";
import { TouchableOpacity } from "react-native-gesture-handler";

// Экран со списком групп пользователя.
export default function GroupsScreen({ navigation }) {
    const [groups, setGroups] = useState([])

    // Обновление списка групп при появлении экрана в фокусе.
    // (Для того, чтобы проще подтянуть изменения сделаные далее по иерархии).
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGroupList()
                .then((groups) => setGroups(groups));
        });

        return unsubscribe;
    }, [navigation]);

    // Создает элемент группы.
    const renderGroup = (group) => {
        return (
            <TouchableOpacity style={styles.groupWrapper} onPress={() => {
                navigation.navigate('GroupCharacters', {groupTitle: group.title})
            }}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
        )
    }

    const provideGroupList = () => {
        if (groups.length === 0) {
            return (
                <View style={styles.noGroupsLabelWrapper}>
                    <Text style={styles.noGroupsLabel}>No groups found</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={groups}
                    renderItem={({ item }) => renderGroup(item)}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header title={'Groups'} showBackButton />

            {provideGroupList()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    groupWrapper: {
        flexDirection: 'row',
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center'
    },
    groupTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 500
    },
    noGroupsLabelWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    noGroupsLabel: {
        opacity: 0.75
    }
})
