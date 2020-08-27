var fs = require('fs');
var path = require('path');

var MockLite = require('mockjs-lite');
var walkdir = require('node-walkdir');

var Mock = MockLite;
var Random = MockLite.Random;

var template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8');
var RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im;


function mock(dir) {
    var routes = {};

    const filepaths = walkdir.sync(dir, /\.json$/i);

    filepaths.forEach(filepath => {
        var content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}';

        var url = filepath;
        var describe = 'no description';

        var m = content.match(RE);

        if (m) {
            url = m[2].trim();
            describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, '');
        }

        if (url[0] !== '/') {
            url = '/' + url;
        }

        var pathname = url;
        var reqUrl = url;
        if (pathname.indexOf('?') > -1) {
            pathname = pathname.split('?')[0];
        }
        if(reqUrl.indexOf('mocks') >-1) {
            reqUrl = reqUrl.split('mocks')[1]
        }
        if(reqUrl.indexOf('/data.json') > -1) {
            reqUrl = reqUrl.split('/data.json')[0]
        }

        if (mock.debug && routes[pathname]) {
            console.warn('[Mock Warn]: [' + filepath + ': ' + pathname + '] already exists and has been covered with new data.');
        }

        routes[reqUrl] = {
            url: reqUrl,
            filepath: filepath,
            describe: describe,
        };

        if (/\.js$/.test(filepath)) {
            routes[reqUrl].data = require(filepath);
        } else {
            try {
                routes[reqUrl].data = new Function('return (' + content + ')')();
            } catch (e) {
                delete routes[pathname];
                mock.debug && console.warn('[Mock Warn]:', e);
            }
        }
    });

    return function (req, res, next) {
        //res.set('Access-Control-Allow-Origin', '*');
        //res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');

        // var allowedHeaders = req.headers['access-control-request-headers'];
        // if (allowedHeaders) {
        //     res.set('Access-Control-Allow-Headers', allowedHeaders);
        // }


        var url = req.url.split('?')[0];

        if (url === '/') { // api document page
            res.header("Content-Type", "text/html;charset=utf-8");
            var host = req.protocol + '://' + req.headers.host + req.baseUrl;

            var list = Object.keys(routes).sort().map(function (path) {
                var route = routes[path];
                return {
                    title: route.describe,
                    url: host + route.url,
                    file: route.filepath,
                };
            });

            return res.end(template.replace('@menuList', JSON.stringify(list)));
        }
        var data = (routes[url] || 0).data;

        console.log("request url=>",url)

        if (data) {
            if (typeof data === 'function') {
                data = data(req, Mock, Random);
            }
            res.json(Mock.mock(data));
        } else {
            next();
        }
    };
}

mock.debug = false;
module.exports = mock;
