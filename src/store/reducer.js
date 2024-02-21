import { saveDataToStore } from '../components/FileSystem';

const initialState = {
    chatsMessages: [],
    chatsSettings: [
        {
            iconNum: 0,
            chatName: 'ChatGPT 3.5',
            api: 'chatGpt35API',
            isDisabled: false
        },
        {
            iconNum: 1,
            chatName: 'GigaChat',
            api: 'gigaChatAPI',
            isDisabled: false
        },
        {
            iconNum: 2,
            chatName: 'YandexGPT',
            api: 'yandexGTPAPI',
            isDisabled: false
        }
    ],
    currentChat: 0,
    chatsModels: []
}

const saveState = ( state ) => {
    saveDataToStore( 'APP_DATA', state );
    return state;
}

const addNewChat = ( state, chatModel ) => {
    const newState = { ...state };
    newState.chatsMessages.push( [] );
    newState.chatsModels.push( chatModel );
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

const deleteChat = ( state, chatIndex ) => {
    const newState = { ...state };

    newState.chatsMessages.splice( chatIndex, 1 );
    newState.chatsModels.splice( chatIndex, 1 );
    if( chatIndex <= newState.currentChat ) newState.currentChat--;
    if( newState.currentChat < 0 ) newState.currentChat = 0;

    return saveState( newState );
}

const setCurrentChat =( state, chatIndex ) => {
    const newState = { ...state };

    newState.currentChat = chatIndex;

    return saveState( newState );
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'LOAD_APP_DATA':
            saveDataToStore( 'APP_DATA', null );
            return state;
            //if ( action.payload ) return action.payload;
            //return saveState( 'APP_DATA', initialState );
        case 'ADD_NEW_CHAT':
            return addNewChat( state, action.payload );
        case 'SEND_MESSAGE_TO_CHAT':
            return addMessageToChat( state, action.payload );
        case 'CLEAR_CHAT':
            return clearChat( state );
        case 'DELETE_CHAT':
            return deleteChat( state, action.payload );
        case 'SET_CURRENT_CHAT':
            return setCurrentChat( state, action.payload )
        default:
            return state;
    }
}

export default reducer;