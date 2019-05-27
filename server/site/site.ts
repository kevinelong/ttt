import * as fs from "fs"
import * as http from "http"

class Site {

    routes: object;
    port: number;
    path: string;

    constructor(routes: object = {}, port: number = 80, path = "./client/") {
        this.port = port;
        this.path = path;
        this.routes = {
            ...routes,
            'GET': {
                '': this.page,
                '/': this.page,
                'index.html': this.page,
                ...routes["GET"]
            }
        };
    }

    listen = () => {
        http.createServer(this.handleRequest).listen(this.port);
    };

    routeError = (req, base) => {
        console.log(`No Route Defined for method '${req.method}' and path '${base}'`);
    };

    handleRequest = (req, res) => {
        let base = Site.getBase(req.url);

        try {
            let G = this.routes[req.method];
            let B = G.hasOwnProperty(base);
            if (this.routes.hasOwnProperty(req.method) && B) {
                G[base](req, res);
            } else if (req.method === 'GET') {
                this.page(req, res, base);
            } else {
                this.routeError(req, base);
            }
        } catch (e) {
            this.routeError(req, base);
        }
    };

    page = (req, res, base = 'index.html') => {
        fs.readFile(this.path + base, 'utf8', function (err, contents) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            if(err === null) {
                res.write(contents);
            }else{
                res.write(err.message);
            }
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