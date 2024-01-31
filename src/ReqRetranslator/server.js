import express from 'express';
import https, { Agent } from "https";
import http from 'http';
import fs from 'fs';
import axios from "axios";

http.createServer(function (request, response) {
    console.log(request.rawHeaders);
    /*response.setHeader(
        'Content-Type',
        'text/html; charset=utf-8;'
    );

    if (request.url === '/home' || request.url === '/') {
        response.write('<h2>Home</h2>');
    } else if (request.url == '/about') {
        response.write('<h2>About</h2>');
    } else if (request.url == '/contact') {
        response.write('<h2>Contacts</h2>');
    } else {
        response.write('<h2>Not found</h2>');
    }
    response.end();*/
}).listen(3000);

/*const app = express();

const host = '127.0.0.1';
const port = 7000;

const key = fs.readFileSync('\cert\russian_trusted_root_ca.cer');
const cert = fs.readFileSync('\cert\russian_trusted_sub_ca.cer');

https.createServer(
        {
            key,
            cert
        },
        app
    )
    .listen(port, host, function () {
        console.log(
            `Server listens https://${host}:${port}`
        );
    });*/

/*import axios from "axios";
import { Agent } from "https";

const TOKEN_ACCESS_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const SCOPE = "";
const CLIENT_AUTH_DATA = "";
const CLIENT_ID = "";

const getAccessToken = async () => {
    try {
        const response = await axios.post( TOKEN_ACCESS_URL, 
            {
                scope: SCOPE
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${ CLIENT_AUTH_DATA }`,
                    "RqUID": CLIENT_ID,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                httpsAgent: new Agent({
                    rejectUnauthorized: false
                })
            });
        return response.data;
    } catch(error) {
        console.error('GigaChat Error (create authorization token):\n', error);
        throw error;
    }
}

const token = await getAccessToken();
console.log(token);

const http = require('http');

const PORT = 3000;

const server = http.createServer(( req, res ) => {
    var body = '';

    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', function () {
        //var post = qs.parse(body);
        // use post['blah'], etc.
        console.log(body);
    });

    res.write('Hello!');
    res.end();
})

server.listen(3000, '192.168.1.94', ( error ) => {
    error ? console.log(error) : console.log(`listening port ${ PORT }`);
});




*/