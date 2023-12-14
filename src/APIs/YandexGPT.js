import axios from 'axios';
import config from '../config/default.json';

class YANDEX_GPT {
    constructor() {
        this.FOLDER_ID = config[ "yandexgpt-folder-id" ];
        this.MODEL_URI = `gpt://${ this.FOLDER_ID }/yandexgpt-lite`;
        this.API_KEY = config[ "yandexgpt-api-secret-key" ];
        this.API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
    }

    makeArrOfObjMessages = ( messages ) => {
        const arrMessages = messages.map(( element, key ) => {
            if(( key % 2 ) === 0) return { 'role': 'user', 'text': element }
            return { 'role': 'assistant', 'text': element }
        });
        arrMessages.unshift({ 'role': 'system', 'text': 'Ты умный ассистент' });
        return arrMessages;
    }

    async chat( messages ) {
        const ArrOfObjMessages = this.makeArrOfObjMessages( messages );

        const response = axios.post( this.API_URL, 
            {
                modelUri: this.MODEL_URI,
                completionOptions: {
                    stream: false,
                    temperature: 0.6,
                    maxTokens: 2000
                },
                messages: ArrOfObjMessages,
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Api-Key ${ this.API_KEY }`,
                }
            }).then( function( response ) {
                return response.data.result.alternatives[ 0 ].message.text;
            }).catch( function( error ){
                return "Нет связи с чат-ботом или ответ не может быть сгенерирован:(";
            })

        return response;
    }

}

export const yandexGTPAPI = new YANDEX_GPT();