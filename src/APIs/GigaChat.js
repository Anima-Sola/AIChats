import axios from "axios";
import config from "../config/default.json";

class GIGA_CHAT {
    constructor() {
        this.TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
        this.CLIENT_ID = config[ "gigachat-client-id" ];
        this.CLIENT_SECRET = config[ "gigachat-client-secret" ];
        this.CLIENT_AUTH_DATA = config[ "gigachat-client-auth-data" ];
        this.SCOPE = config[ "gigachat-scope" ];
        this.ACCESS_TOKEN = config[ "gigachat-access-token" ];
        this.tokenExpirationData = 0;
        this.accessToken = "";

        this.model = "GigaChat-Pro";
        this.API_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";  
        //https://cors-anywhere.herokuapp.com/
    }

    async getAccessToken() {
        const response = axios.post( this.TOKEN_ACCESS_URL, 
            {
                scope: this.SCOPE
            }, 
            {
                headers: {
                    "Authorization": `Basic ${ this.CLIENT_AUTH_DATA }`,
                    "RqUID": this.CLIENT_ID,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 3000,
            }).then( function( response ) {
                console.log(response);
                return "Есть ответ!!!"
            }).catch( function( error ){
                console.log(error.toJSON());
                return "Нет связи с чат-ботом :(";
            });

        return response;
    }

    makeArrOfObjMessages = ( messages ) => {
        const arrMessages = messages.map(( element, key ) => {
            if(( key % 2 ) === 0) return { 'role': 'user', 'content': element }
            return { 'role': 'assistant', 'content': element }
        });
        return arrMessages;
    }

    async chat( messages ) {
        /*const response = await this.getAccessToken();
        return response;*/

        const arrMessages = this.makeArrOfObjMessages( messages );
        
        const response = axios.post( this.API_URL, 
            {
                model: this.model,
                messages: arrMessages
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${ this.ACCESS_TOKEN }`,
                    "Content-Type": "application/json",
                },
                timeout: 3000
            }).then( function( response ) {
                console.log(response);
                return "Есть ответ!!!"
            }).catch( function( error ){
                console.log(error.toJSON());
                return "Нет связи с чат-ботом :(";
            })

        return response;
    }
}

export const gigaChatAPI = new GIGA_CHAT();