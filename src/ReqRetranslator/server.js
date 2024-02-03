import express from 'express';
import { Agent } from "https";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getAccessToken = async ({ Scope, Authorization, RqUID, TokenAccessUrl }) => {
    try {
        const response = await axios.post( TokenAccessUrl, 
            {
                scope: Scope
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${ Authorization }`,
                    "RqUID": RqUID,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                httpsAgent: new Agent({
                    rejectUnauthorized: false
                }),
                timeout: 30000
            });
        return response.data;
    } catch(error) {
        console.error('GigaChat Error (create authorization token):\n', error);
        throw error;
    }
}

const getCompletions = async({ Model, Messages, Authorization, ApiUrl }) => {
    try {
        const response = await axios.post( ApiUrl, 
            {
                model: Model,
                messages: Messages
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${ Authorization }`,
                    "Content-Type": "application/json",
                },
                httpsAgent: new Agent({
                    rejectUnauthorized: false
                }),
                timeout: 30000
            });
            return response?.data?.choices?.[0]?.message?.content;
    } catch(error) {
        console.error('GigaChat Error (create authorization token):\n', error);
        throw error;
    }
}

app.post('/', async ( req, res ) => {
    switch( req.body.command ) {
        case 'get_access_token':
            const token = await getAccessToken( req.body );
            res.send( token );
            break;
        case 'completions':
            const reply = await getCompletions( req.body );
            res.send( reply );
            break;
        default:
            break;
    }
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});