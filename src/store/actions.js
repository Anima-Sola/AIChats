import { getDataFromStore } from '../components/FileSystem';

export const loadAppDataAction = () => {
    return async dispatch => {
        const settings = await getDataFromStore( 'APP_DATA' );
        dispatch({
            type: 'LOAD_APP_DATA',
            payload: settings
        });
    };
}

export const addNewChatAction = ( chatModel = 0 ) => {
    return {
        type: 'ADD_NEW_CHAT',
        payload: chatModel
    }
}

export const sendMessageToChatAction = ( message = '' ) => {
    return {
        type: 'SEND_MESSAGE_TO_CHAT',
        payload: message
    }
}

export const clearChatAction = () => {
    return {
        type: 'CLEAR_CHAT',
    }
}

export const deleteChatAction = ( chatIndex ) => {
    return {
        type: 'DELETE_CHAT',
        payload: chatIndex
    }
}

export const setCurrentChatAction = ( chatIndex ) => {
    return {
        type: 'SET_CURRENT_CHAT',
        payload: chatIndex
    }
}