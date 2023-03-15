import AsyncStorage from '@react-native-async-storage/async-storage';

const groupsKey = "GROUPS_ASYNC_STORAGE";
const commentsKey = "COMMENTS_ASYNC_STORAGE";

// Group functions.

export async function addGroup(groupTitle) {
    const groups = await getData(groupsKey);
    if (await groupTitleExists(groupTitle)) {
        return false;
    } else if (groups === null) {
        return await storeData([{
            title: groupTitle,
            characters: []
        }], groupsKey);
    } else {
        return await storeData([
            {
                title: groupTitle,
                characters: []
            },
            ...groups
        ], groupsKey);
    }
}

async function groupTitleExists(groupTitle) {
    const groups = await getData(groupsKey);
    if (groups === null) { return false }
    for (const group of groups) {
        if (group.title === groupTitle) {
            return true;
        }
    }
    return false;
}

export async function addCharacterToGroup(character, groupTitle) {
    const groups = await getData(groupsKey);
    if (groups === null) {
        return false;
    } else {
        let result = [];
        for (const group of groups) {
            if (group.title !== groupTitle) {
                result.push(group);
            } else {
                result.push({
                    ...group,
                    characters: [...group.characters, character]
                });
            }
        }
        return await storeData(result, groupsKey);
    }
}

export async function removeCharacterFromGroup(character, groupTitle) {
    const groups = await getData(groupsKey);
    if (groups === null) {
        return false;
    } else {
        let found = false
        let result = [];
        for (const group of groups) {
            if (group.title !== groupTitle) {
                result.push(group);
            } else if (group.characters.some(
                storedCharacter => (storedCharacter._id === character._id)
            )) {
                found = true
                result.push({
                    ...group,
                    characters: group.characters.filter(
                        storedCharacter => storedCharacter._id !== character._id
                    )
                })
            }
        }
        if (found) {
            return await storeData(result, groupsKey);
        } else {
            return false
        }
        
    }
}

export async function getGroupsDataOfCharacter(characterId) {
    const groups = await getData(groupsKey);
    if (groups === null) {
        return [];
    }
    return groups.map((group) => {
        return {
            title: group.title,
            includesCharacter: group.characters.some(
                (character) => (character._id === characterId)
            )
        };
    })
}

export async function getGroupList() {
    const groups = await getData(groupsKey);
    if (groups === null) {
        return [];
    }
    return groups.map((group) => ({ title: group.title }))
}

export async function getGroupCharacters(groupTitle) {
    const groups = await getData(groupsKey);
    if (groups === null) {
        return [];
    }
    for (const group of groups) {
        if (group.title === groupTitle) {
            return group.characters
        }
    }
    return []
}

export async function exportGroupsInfo() {
    return await getData(groupsKey);
}

export async function importGroupsInfo(groupsInfo) {
    return await storeData(groupsInfo, groupsKey)
}

// Comments functions.

export async function addCommentToCharacter(characterId, comment) {
    const comments = await getData(commentsKey);
    if (comments === null) {
        return await storeData([{
            character: characterId,
            comments: [comment]
        }], commentsKey)
    } else {
        let commentWasAdded = false
        let result = [];
        for (const commentBranch of comments) {
            if (commentBranch.character === characterId) {
                result.push({
                    ...commentBranch,
                    comments: [comment, ...commentBranch.comments]
                })
                commentWasAdded = true
            } else {
                result.push(commentBranch);
            }
        }
        if (commentWasAdded) {
            return await storeData(result, commentsKey);
        } else {
            return await storeData([
                ...comments,
                {
                    character: characterId,
                    comments: [comment]
                }
            ], commentsKey)
        }
    }
}

export async function getCommentsOfCharacter(characterId) {
    const comments = await getData(commentsKey);
    if (comments === null) {
        return [];
    }
    for (const commentBranch of comments) {
        if (commentBranch.character === characterId) {
            return commentBranch.comments;
        }
    }
    return [];
}

export async function exportCommentsInfo() {
    return await getData(commentsKey);
}

export async function importCommentsInfo(commentsInfo) {
    return await storeData(commentsInfo, commentsKey)
}

// System functions.

async function storeData(value, key) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true
    } catch (e) {
        console.log("Error while saving values in AsyncStorage");
        return false
    }
}

async function getData(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error while reading values in AsyncStorage");
        return null;
    }
}
