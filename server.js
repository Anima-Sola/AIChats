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

