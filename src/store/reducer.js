import { saveDataToStore } from '../components/FileSystem';

import ChatGPTIcon from '../assets/ChatIcons/ChatGPTicon.png';

const initialState = {
    chatsMessages: [],
    chatsSettings: [
        {
            model: 'gpt-3.5-turbo',
            icon: ChatGPTIcon,
            chatName: 'CHATGPT'
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



//const axios = require('axios');

// Функция для отправки запроса к ChatGPT
/*async function chatWithGPT(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'text-davinci-003', // Имя модели GPT для чата
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY', // Замените YOUR_API_KEY на ваш ключ API OpenAI
        'Content-Type': 'application/json',
      },
    });

    const completions = response.data.choices[0].message.content;
    return completions;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}*/

// Пример использования функции chatWithGPT
/*(async () => {
  const userInput = 'Привет! Как ты можешь мне помочь?'; // Ввод пользователя
  const completions = await chatWithGPT(userInput);
  console.log('Ответ GPT:', completions);
})();*/