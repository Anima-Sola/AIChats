import { saveDataToStore } from '../components/FileSystem';

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';

const initialState = {
    chatsMessages: [],
    chatsSettings: [
        {
            icon: ChatGPTIcon,
            chatName: 'CHATGPT',
            api: 'chatGpt35API'
        }
    ],
    currentChat: 0,
    currentChatModel: 0,
}

const saveState = ( state ) => {
    saveDataToStore( 'APP_DATA', state );
    return state;
}

const addNewChat = ( state ) => {
    const newState = { ...state };
    newState.chatsMessages.push( [] );
    return saveState( newState );
}

const addMessageToChat = ( state, message ) => {
    const currentChat = state.currentChat;
    const newState = { ...state };

    newState.chatsMessages[ currentChat ].push( message );
    return saveState( newState );
}

const clearChat = ( state ) => {
    const currentChat = state.currentChat;
    const newState = { ...state };

    newState.chatsMessages[ currentChat ] = [];
    return saveState( newState );
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'LOAD_APP_DATA':
            saveDataToStore( 'APP_DATA', null );
            //if ( action.payload ) return action.payload;
            //return saveState( 'APP_DATA', initialState );
        case 'ADD_NEW_CHAT': 
            return addNewChat( state );
        case 'SEND_MESSAGE_TO_CHAT':
            return addMessageToChat( state, action.payload );
        case 'CLEAR_CHAT':
            return clearChat( state );
        default:
            return state;
    }
}

export default reducer;