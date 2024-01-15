import axios from "axios";
import { fetch } from 'react-native-ssl-pinning';
import config from "../config/default.json";

class GIGA_CHAT {
    constructor() {
        //this.TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
        this.TOKEN_ACCESS_URL = "https://webhook.site/483d9106-2ba2-4ac0-a931-6238ae1686ea";
        //this.TOKEN_ACCESS_URL = "https://cors-anywhere.herokuapp.com/https://ngw.devices.sberbank.ru:9443/api/v2/oauth";*/
        this.CLIENT_ID = config[ "gigachat-client-id" ];
        this.CLIENT_SECRET = config[ "gigachat-client-secret" ];
        this.CLIENT_AUTH_DATA = config[ "gigachat-client-auth-data" ];
        this.SCOPE = config[ "gigachat-scope" ];
        this.tokenExpirationData = 0;
        this.accessToken = "";

        this.model = "GigaChat-Pro";
        this.API_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";  
    }

    getAccessToken() {

        /*fetch(this.TOKEN_ACCESS_URL, {
            method: "POST" ,
            timeoutInterval: 3000,
            body: "scope=GIGACHAT_API_PERS",
            sslPinning: {
                certs: ["russian_trusted_root_ca","russian_trusted_sub_ca"]
            },
            headers: {
                Authorization: `Bearer ${ this.CLIENT_AUTH_DATA }`,
                RqUID: this.CLIENT_ID,
                ContentType: "application/x-www-form-urlencoded",
            }
        })
        .then(response => {
            console.log(`response received ${response}`)
            return "Есть коннект!";
        })
        .catch(err => {
            console.log(`error: ${err}`)
            return "Нет связи с чат-ботом!";
        })*/

        const response = axios.post( this.TOKEN_ACCESS_URL, 
            {
                scope: this.SCOPE
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${ this.CLIENT_AUTH_DATA }`,
                    "RqUID": this.CLIENT_ID,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 3000,
            }).then( function( response ) {
                console.log(response);
                return "Есть коннект!!";
            }).catch( function( error ){
                console.log(error.toJSON());
                return "Нет связи с чат-ботом :(";
            })
    }

    makeArrOfObjMessages = ( messages ) => {
        const arrMessages = messages.map(( element, key ) => {
            if(( key % 2 ) === 0) return { 'role': 'user', 'content': element }
            return { 'role': 'assistant', 'content': element }
        });
        return arrMessages;
    }

    async chat( messages ) {
        const response = this.getAccessToken();
        return response;

        /*const arrMessages = this.makeArrOfObjMessages( messages );
        
        const response = axios.post( this.API_URL, 
            {
                model: this.model,
                messages: arrMessages
            }, 
            {
                headers: {
                    "Authorization": `Bearer `,
                    "Content-Type": "application/json",
                },
                timeout: 3000
            }).then( function( response ) {
                console.log(response);
                return response;
            }).catch( function( error ){
                console.log(error.toJSON());
                return "Нет связи с чат-ботом :(";
            })

        return response;*/
    }
}

export const gigaChatAPI = new GIGA_CHAT();