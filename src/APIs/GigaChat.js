import axios from "axios";
import config from "../config/default.json";

class GIGA_CHAT {
    constructor() {
        this.TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
        this.CLIENT_ID = config[ "gigachat-client-id" ];
        this.CLIENT_SECRET = config[ "gigachat-client-secret" ];
        this.CLIENT_AUTH_DATA = config[ "gigachat-client-auth-data" ];
        this.SCOPE = config[ "gigachat-scope" ];
        this.tokenExpirationData = 0;
        this.accessToken = "";

        this.model = "GigaChat:latest";
        this.API_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";
        
    }

    makeArrOfObjMessages = ( messages ) => {
        const arrMessages = messages.map(( element, key ) => {
            if(( key % 2 ) === 0) return { 'role': 'user', 'content': element }
            return { 'role': 'assistant', 'content': element }
        });
        return arrMessages;
    }

    async chat( messages ) {
        
        /*let url = 'https://ya.ru/search/?text=fetch+javascript&lr=12&search_source=yaru_desktop_common&search_domain=yaru&src=suggest_Pers';
        let response = await fetch(url);
        console.log(response.json());

        return "Ответ";*/
           
        fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", 
            {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer ",
                "RqUID": ''
            },
            body: "scope=GIGACHAT_API_PERS"
        })
        .then( response => response.json() )
        .then( result => {
            console.log( result.expires_at, result.access_token );
            return result?.expires_at;
        });

        return "Ответ";

        /*axios({
            url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer ",
                "RqUID": ''
            },
            data: {
                scope: "GIGACHAT_API_PERS"
            }
        }).then(( response ) => {
            console.log( response )
        }).catch(function (error) {
            console.log(error.toJSON());
            return "Нет связи с чат-ботом :(";
        });*/   
       // const ArrOfObjMessages = this.makeArrOfObjMessages( messages );
        /*try {
            const response = await axios.post( this.TOKEN_ACCESS_URL, 
                {
                    scope: this.SCOPE
                }, 
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${ this.CLIENT_AUTH_DATA }`,
                        "RqUID": this.CLIENT_ID
                    }
                });
            return response;
        } catch( error ) {
            console.error('Error:', error.toJSON());
            return "Нет связи с чат-ботом :(";
        }*/
    }
}

export const gigaChatAPI = new GIGA_CHAT();