const fs = require('fs');
const path = require('path');

const MockLite = require('mockjs-lite');
const walkdir = require('node-walkdir');

const Mock = MockLite;
const { Random } = MockLite;

const template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8');
const RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im;

function mock(dir) {
  const routes = {};
  const filepaths = walkdir.sync(dir, /\.json$/i);

  filepaths.forEach((filepath) => {
    const content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}';

    let url = filepath;
    let describe = 'no description';

    const m = content.match(RE);

    if (m) {
      url = m[2].trim();
      describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, '');
    }

    if (url[0] !== '/') {
      url = `/${url}`;
    }

    let pathname = url;
    let reqUrl = url;
    if (pathname.indexOf('?') > -1) {
      pathname = pathname.split('?')[0];
    }
    if (reqUrl.indexOf('mocks') > -1) {
      reqUrl = reqUrl.split('mocks')[1];
    }
    if (reqUrl.indexOf('/data.json') > -1) {
      reqUrl = reqUrl.split('/data.json')[0];
    }
    reqUrl = reqUrl.replace(/\\/g, '/');
    if (mock.debug && routes[pathname]) {
      console.warn(`[Mock Warn]: [${filepath}: ${pathname}] already exists and has been covered with new data.`);
    }

    routes[reqUrl] = {
      url: reqUrl,
      filepath,
      describe,
    };

    if (/\.js$/.test(filepath)) {
      routes[reqUrl].data = require(filepath);
    } else {
      try {
        routes[reqUrl].data = new Function(`return (${content})`)();
      } catch (e) {
        delete routes[pathname];
        mock.debug && console.warn('[Mock Warn]:', e);
      }
    }
  });

  return function (req, res, next) {
    const url = req.url.split('?')[0];
    if (url === '/') {
      // api document page
      res.header('Content-Type', 'text/html;charset=utf-8');
      const host = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

      const list = Object.keys(routes)
        .sort()
        .map(function (path) {
          const route = routes[path];
          return {
            title: route.describe,
            url: host + route.url,
            file: route.filepath,
          };
        });

      return res.end(template.replace('@menuList', JSON.stringify(list)));
    }
    let { data } = routes[url] || 0;
    console.log('request url=>', url);

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
