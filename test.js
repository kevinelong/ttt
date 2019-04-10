
let g = new Game();

g.board.add(0, 0, new Token('x'));
g.board.render();

g.board.add(1, 1, new Token('x'));
g.board.render();

g.board.add(2, 2, new Token('x'));
g.board.render();


let g2 = new Game();

g2.board.add(2, 0, new Token('x'));
g2.board.render();

g2.board.add(1, 1, new Token('x'));
g2.board.render();

g2.board.add(0, 2, new Token('x'));
g2.board.render();

let g3 = new Game();

g3.board.add(0, 2, new Token('o'));
g3.board.render();

g3.board.add(1, 2, new Token('o'));
g3.board.render();

g3.board.add(2, 2, new Token('o'));
g3.board.render();

let g4 = new Game(19,5);

g4.board.add(2, 2, new Token('o'));
g4.board.render();

g4.board.add(3, 2, new Token('o'));
g4.board.render();

g4.board.add(4, 2, new Token('x'));
g4.board.render();

g4.board.add(5, 2, new Token('o'));
g4.board.render();

g4.board.add(6, 2, new Token('o'));
g4.board.render();

g4.board.add(4, 2, new Token('o'));
g4.board.render();

