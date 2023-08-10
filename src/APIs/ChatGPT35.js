import axios from 'axios';
import config from '../config/default.json';

class CHAT_GPT_3_5 {
    constructor() {
        this.model = "gpt-3.5-turbo";
        this.API_KEY = config[ this.model ];
        this.API_URL = 'https://api.openai.com/v1/chat/completions';
    }

    async chat( messages ) {
        try {
            const response = await axios.post( this.API_URL, 
                {
                    model: this.model,
                    messages,
                }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.API_KEY,
                    },
                });
            return completions = response?.data?.choices?.[0]?.message?.content;
        } catch( error ) {
            console.error('Error:', error);
            throw error;
        }
    }

}

export const chatGpt35API = new CHAT_GPT_3_5();