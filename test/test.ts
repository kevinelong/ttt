import {Game} from "../server/game/game";

let g = new Game();

g.add(0, 0, 'x');
g.render();

g.add(1, 1, 'x');
g.render();

g.add(2, 2, 'x');
g.render();


let g2 = new Game();

g2.add(2, 0, 'x');
g2.render();

g2.add(1, 1, 'x');
g2.render();

g2.add(0, 2, 'x');
g2.render();

let g3 = new Game();

g3.add(0, 2, 'o');
g3.render();

g3.add(1, 2, 'o');
g3.render();

g3.add(2, 2, 'o');
g3.render();

let g4 = new Game(19, 5);

g4.add(2, 2, 'o');
g4.render();

g4.add(3, 2, 'o');
g4.render();

g4.add(4, 2, 'x');
g4.render();

g4.add(5, 2, 'o');
g4.render();

g4.add(6, 2, 'o');
g4.render();

g4.add(4, 2, 'o');
g4.render();
