declare function require(name: string);

import {Game} from "./game/game";
import {Site} from "./site/site";

let Action = (action:string, details={})=>{
    return {
        action,
        ...details
    }
};

let game = new Game(19, 5);

let sendState = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(game.getState());
    res.end();
};

let echoState = (req, res, data) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(data));
    res.end();
};

let add = (req,res,data)=> {
    data.symbol = game.add(parseInt(data.x), parseInt(data.y));
    data.status = game.status;
    return echoState(req,res,data);
};

let actions = {
    'add': add
};

let handleAction = (req, res, data) => {
    try{
        return actions[data.action](req,res,data)
    }catch{
        return {};
    }
};

let handlePost = (req, res, callback) => {
    let jsonString = '';
    req.on('data', (data) => jsonString += data);
    req.on('end', () => callback(req, res, JSON.parse(jsonString)));
};

let site = new Site({
    'GET': {
        '/game/': (req, res) => sendState(req, res)
    },
    'POST': {
        '/game/': (req, res) => handlePost(req, res, handleAction)
    }
});
site.listen();


