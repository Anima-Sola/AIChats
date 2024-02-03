import axios from "axios";
import config from "../config/default.json";

class GIGA_CHAT {
    constructor() {
        this.RETRANSLATOR_URL = "http://192.168.1.94:3000";

        this.TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
        this.API_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";  
        this.CLIENT_AUTH_DATA = config[ "gigachat-client-auth-data" ];
        this.SCOPE = config[ "gigachat-scope" ];
        this.ACCESS_TOKEN_EXPIRES_AT = 0;
        this.ACCESS_TOKEN = '';
        this.model = "GigaChat:latest";
    }

    async getAccessToken() {
        const response = axios.post( this.RETRANSLATOR_URL, 
            {
                command: 'get_access_token',
                Scope: this.SCOPE,
                Authorization: this.CLIENT_AUTH_DATA,
                RqUID: this.CLIENT_ID,
                TokenAccessUrl: this.TOKEN_ACCESS_URL
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            }).then( function( response ) {
                return { result: true, accessToken: response.data.access_token, accessTokenExpiresAt: response.data.expires_at };
            }).catch( function() {
                return { result: false };
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
        const currentDate = new Date().getTime();

        if( this.ACCESS_TOKEN_EXPIRES_AT < currentDate ) {
            const response = await this.getAccessToken();

            if( response.result ) {
                this.ACCESS_TOKEN = response.accessToken;
                this.ACCESS_TOKEN_EXPIRES_AT = response.accessTokenExpiresAt;
            } else {
                return "Нет связи с чат-ботом :(";
            }
        }

        const arrMessages = this.makeArrOfObjMessages( messages );
        
        const response = axios.post( this.RETRANSLATOR_URL, 
            {
                command: 'completions',
                Model: this.model,
                Messages: arrMessages,
                Authorization: this.ACCESS_TOKEN,
                ApiUrl: this.API_URL
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 30000
            }).then( function( response ) {
                return response.data;
            }).catch( function( error ){
                return "Нет связи с чат-ботом :(";
            })

        return response;
    }
}

export const gigaChatAPI = new GIGA_CHAT();


/*
const  xhr = new XMLHttpRequest();
        xhr.open('POST', this.TOKEN_ACCESS_URL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("RqUID", this.CLIENT_ID);
        xhr.setRequestHeader("Authorization", `Basic ${ this.CLIENT_AUTH_DATA }`);

        xhr.send(`scope=${this.SCOPE}`);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            console.log(xhr.error);
            console.log(xhr.statusText, xhr.responseText, xhr.status);
          
            if (xhr.status != 200) {
              console.log(xhr.status + ': ' + xhr.statusText);
            } else {
              console.log(xhr.responseText);
            }
          
        }
*/