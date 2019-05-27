import {Game} from "./game/game";
import {Site} from "./site/site";

let Action = (action:string, details={})=>{
    return {
        action,
        ...details
    }
};

let game = new Game(19, 5);

let sendState = (q, r) => {
    r.writeHead(200, {'Content-Type': 'text/json'});
    r.write(game.getState());
    r.end();
};

let echoState = (q, r, data) => {
    r.writeHead(200, {'Content-Type': 'text/json'});
    r.write(JSON.stringify(data));
    r.end();
};

let add = (q,r,data)=> {
    data.symbol = game.add(parseInt(data.x), parseInt(data.y));
    data.status = game.status;
    return echoState(q,r,data);
};

let actions = {
    'add': add
};

let handleAction = (q, r, data) => {
    try{
        return actions[data.action](q,r,data)
    }catch{
        return {};
    }
};

let handlePost = (q, r, callback) => {
    let jsonString = '';
    q.on('data', (data) => jsonString += data);
    q.on('end', () => callback(q, r, JSON.parse(jsonString)));
};

let site = new Site({
    'GET': {
        '/game/': (q, r) => sendState(q, r)
    },
    'POST': {
        '/game/': (q, r) => handlePost(q, r, handleAction)
    }
});

site.listen();