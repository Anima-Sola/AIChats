import { Configuration, OpenAIApi } from 'openai';
import config from '../../config';

const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        SYSTEM: 'system',
        USER: 'user',
    }


}

export const openai = new OpenAI(config.get('CHAT_GPT_KEY'));