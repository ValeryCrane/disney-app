import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { addGroup, addCharacterToGroup, getGroupsDataOfCharacter } from "../../../AsyncStorage";
import { BottomSheetTextInput, BottomSheetFlatList } from "@gorhom/bottom-sheet";

// Попап со списком групп.
export default function GroupPopup({ character }) {

    const [input, setInput] = useState('')
    const [groups, setGroups] = useState([])

    // Обработчик добаления новой группы.
    const internalAddGroup = async (groupTitle) => {
        if (groupTitle === '') { return }
        
        const success = await addGroup(groupTitle)
        if (success) {
            const characterGroups = await getGroupsDataOfCharacter(character._id);
            setInput('');
            setGroups(characterGroups);
        } else {
            Alert.alert('Group was not added. Maybe there is already a group with the same name&')
        }
    }

    // Обработчик добавляения персонажа в группу.
    const internalAddCharacterToGroup = async (groupTitle) => {
        const success = await addCharacterToGroup(character, groupTitle)
        if (success) {
            const characterGroups = await getGroupsDataOfCharacter(character._id);
            setGroups(characterGroups);
        } else {
            Alert.alert('Something went wrong while adding character.')
        }
    }

    const handleSearch = (groups) => {
        return groups.filter(
            (group) => group.title.toLowerCase().startsWith(input.toLowerCase())
        )
    }

    // Получаем базу групп.
    useEffect(() => {
        getGroupsDataOfCharacter(character._id).then(
            (characterGroups) => {
                setGroups(characterGroups)
            }
        )
    }, [])

    const renderGroupItem = (item) => {
        const groupIncludes = item.includesCharacter

        const addButton = groupIncludes ?
            (<TouchableOpacity 
                style={[styles.addToGroupButton, {backgroundColor: '#47a842'}]}
                activeOpacity={1}>
                <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>) :
            (<TouchableOpacity 
                style={[styles.addToGroupButton, {backgroundColor: '#317cf5'}]}
                onPress={() => {
                    internalAddCharacterToGroup(item.title)
                }}>
                <AntDesign name="adduser" size={24} color="white" />    
            </TouchableOpacity>)

        return <View style={styles.groupWrapper}>
            <Text style={styles.groupTitle}>{item.title}</Text>
            {addButton}
        </View>
    }

    return (
        <View style={styles.background}>
            <View style={styles.headerWrapper}>
                <BottomSheetTextInput 
                    style={styles.input} 
                    placeholder={'Search'}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity style={styles.addGroupButton} onPress={() => internalAddGroup(input)}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <BottomSheetFlatList
                style={styles.commentList}
                scrollEnabled={false}
                data={handleSearch(groups)}
                renderItem={({ item }) => {
                    return renderGroupItem(item)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        minHeight: '100%'
    },
    headerWrapper: {
        marginTop: 16,
        flexDirection: 'row',
        marginBottom: 16
    },
    input: {
        height: 40,
        marginLeft: 16,
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#e3e3e3',
        flex: 1
    },
    addGroupButton: {
        height: 40,
        width: 40,
        marginLeft: 8,
        marginRight: 16,
        backgroundColor: '#317cf5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addToGroupButton: {
        height: 36,
        width: 36,
        marginLeft: 8,
        marginRight: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupTitle: {
        marginLeft: 16,
        paddingTop: 12,
        paddingBottom: 12,
        flex: 1
    }
})