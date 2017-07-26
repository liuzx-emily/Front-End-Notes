const http = require('http');
const server = http.createServer();
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
server.listen(8080, 'localhost');
server.on('listening', () => {
    console.log(`listening port:${server.address().port}`);
});
server.on('request', (req, res) => {
    console.log('sombody just visited!');
    const urlStr = url.parse(req.url);
    switch (urlStr.pathname) {
        case '/':
            getHTML(__dirname + '/demo/src/index.html', res)
            break;
        case '/login':
            getHTML(__dirname + '/demo/src/login.html', res)
            break;
        case '/login/check':
            if (req.method.toUpperCase() === 'GET') {
                console.log('GET');
                console.log(querystring.parse(urlStr.query));
            } else {
                console.log('POST');
                let str = '';
                req.on('data', chunk => {
                    str += chunk;
                });
                req.on('end', () => {
                    console.log(querystring.parse(str));
                });
            }
            break;
        default:
            getHTML(__dirname + '/demo/dist/err.html', res)
            break;
    }
});

function getHTML(fn, res) {
    console.log(fn);
    fs.readFile(fn, (err, data) => {
        if (err) {
            res.writeHead(404, {
                "content-type": "text/html;charset=utf-8"
            });
            fs.readFileS(__dirname + '/demo/dist/err.html', (err, data) => {
                res.write(data);
                res.end();
            });
        } else {
            res.writeHead(200, {
                "content-type": "text/html;charset=utf-8"
            });
            res.write(data);
            res.end();
        }
    });


}
