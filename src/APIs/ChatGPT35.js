import axios from 'axios';
import config from '../config/default.json';

class CHAT_GPT_3_5 {
    constructor() {
        this.model = "gpt-3.5-turbo";
        this.API_KEY = config[ "gpt-3.5-turbo-proxy-api-key" ];
        //this.API_URL = 'https://api.openai.com/v1/chat/completions';
        this.API_URL = 'https://api.proxyapi.ru/openai/v1/chat/completions';
    }

    makeArrObjMessages = ( messages ) => {
        const arrMessages = messages.map(( element, key ) => {
            if(( key % 2 ) === 0) return { 'role': 'user', 'content': element }
            return { 'role': 'assistant', 'content': element }
        });
        arrMessages.unshift({ 'role': 'system', 'content': 'You are a helpful assistant.' });
        return arrMessages;
    }

    async chat( messages ) {
        const ArrOfObjMessages = this.makeArrObjMessages( messages );

        const response = axios.post( this.API_URL, 
            {
                model: this.model,
                messages: ArrOfObjMessages,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.API_KEY,
                },
                timeout: 3000
            }).then( function( response ) {
                return completions = response?.data?.choices?.[0]?.message?.content;
            }).catch( function( error ){
                return "Нет связи с чат-ботом:(";
            })

        return response;
    }

}

export const chatGpt35API = new CHAT_GPT_3_5();