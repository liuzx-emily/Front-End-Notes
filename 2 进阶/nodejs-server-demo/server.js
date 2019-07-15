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
	if (req.url == "/favicon.ico") {
		res.end();
		return;
	}
	const urlStr = url.parse(req.url);
	switch (urlStr.pathname) {
		case '/':
			getHTML(__dirname + '/page/index.html', res)
			break;
		case '/login':
			getHTML(__dirname + '/page/login.html', res)
			break;
		case '/login/check':
			if (req.method.toUpperCase() === 'GET') {
				// get参数 querystring.parse(urlStr.query)
				res.setHeader("content-type", "application/json; charset=utf-8");
				res.write("成功啦！");
				res.end();
			} else {
				let str = '';
				req.on('data', chunk => {
					str += chunk;
				});
				req.on('end', () => {
					// post参数 querystring.parse(str)
				});
			}
			break;
		default:
			getHTML(__dirname + '/page/error.html', res)
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
			fs.readFileS(__dirname + '/page/error.html', (err, data) => {
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