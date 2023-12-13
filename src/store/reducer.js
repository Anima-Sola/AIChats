import { saveDataToStore } from '../components/FileSystem';

const initialState = {
    chatsMessages: [],
    chatsSettings: [
        {
            iconNum: 0,
            chatName: 'CHATGPT',
            api: 'chatGpt35API',
        },
        {
            iconNum: 1,
            chatName: 'GIGACHAT',
            api: 'gigaChatAPI',
        },
        {
            iconNum: 2,
            chatName: 'YANDEXGPT',
            api: 'yandexGTPAPI',
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
        default:
            return state;
    }
}

export default reducer;