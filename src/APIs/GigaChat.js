import axios from "axios";
import config from "../config/default.json";

class GIGA_CHAT {
    constructor() {
        //this.TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
        //this.TOKEN_ACCESS_URL = "https://webhook.site/2fdbc381-874f-4866-aae3-a01841327fdd";
        this.TOKEN_ACCESS_URL = "http://192.168.1.94:3000";
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

        /*const response = await this.getAccessToken();
        return response;*/

        /*const arrMessages = this.makeArrOfObjMessages( messages );
        
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

        return response;*/

        return "Нет связи с чат-ботом :(";
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