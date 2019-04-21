declare function require(name: string);

import * as fs from "fs"
import * as http from "http"

class Site {

    routes: object;

    constructor(routes: object = {}, port: number = 8181) {
        this.routes = {
            ...routes,
            'GET': {
                '': this.page,
                '/': this.page,
                ...routes["GET"]
            }
        };
        http.createServer(this.handleRequest).listen(port);
    }

    handleRequest = (req, res) => {
        let base = Site.getBase(req.url);
        try {
            let f = this.routes[req.method][base];
            debugger;
            f(req, res);
        } catch (e) {
            console.log(`No Route Defined for method '${req.method}' and path '${base}'`);
        }
    };

    page = (req, res) => {
        fs.readFile('index.html', 'utf8', function (err, contents) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(contents);
            res.end();
        });
    };

    static getBase = (url) => {
        let i = url.indexOf('?');

        if (i === -1) {
            return url;
        }
        return url.slice(0, i);
    };

    static getParameters = (url) => {
        let i = url.indexOf('?');

        if (i === -1) {
            return {};
        }

        let output = {};
        url.slice(i + 1).split('&').map((p) => {
            let pair = p.split('=');
            if (pair.length > 1) {
                output[pair[0]] = pair[1];
            }
        });
        return output;
    };

}

export {Site};