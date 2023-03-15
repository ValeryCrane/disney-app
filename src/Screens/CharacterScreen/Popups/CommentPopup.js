import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { addCommentToCharacter, getCommentsOfCharacter } from "../../../AsyncStorage";
import { BottomSheetTextInput, BottomSheetFlatList } from "@gorhom/bottom-sheet";


// Попап с комментариями о персонаже. Принимает объект персонажа.
export default function CommentPopup({ character }) {

    const [input, setInput] = useState('');
    const [comments, setComments] = useState([]);

    // Добавляет комментарий в базу и обновляет список комментариев.
    const addComment = async (comment) => {
        if (comment === '') { return; }

        const success = await addCommentToCharacter(character._id, comment);
        if (success) {
            const characterComments = await getCommentsOfCharacter(character._id);
            setInput('');
            setComments(characterComments);
        } else {
            Alert.alert('Something went wrong while saving data locally.');
        }
    };

    // Получаем базу комментариев.
    useEffect(() => {
        getCommentsOfCharacter(character._id).then(
            (characterComments) => {
                setComments(characterComments);
            }
        );
    }, [])

    return (
        <View style={styles.background}>
            <View style={styles.headerWrapper}>
                <BottomSheetTextInput 
                    style={styles.input} 
                    placeholder={'Comment'}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity style={styles.addCommentButton} onPress={() => addComment(input)}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <BottomSheetFlatList
                style={styles.commentList}
                data={comments}
                renderItem={({ item }) => {
                    return <Text style={styles.comment}>{item}</Text>
                }}
            />
        </View>
    );
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
    addCommentButton: {
        height: 40,
        width: 40,
        marginLeft: 8,
        marginRight: 16,
        backgroundColor: '#317cf5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    comment: {
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 12,
        paddingBottom: 12
    },
    commentList: {
        flex: 1
    }
});