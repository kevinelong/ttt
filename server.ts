declare function require(name: string);

import {Game} from "./game/game";
import {Site} from "./site/site";

let game = new Game(19, 5);

let site = new Site({
    'GET' : {
        '/game/': (req, res) => {
            debugger;
            let param = Site.getParameters(req.url);
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(game.getState());
            res.end();
        }
    }
});



