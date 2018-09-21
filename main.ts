class Token {

    symbol: string;

    constructor(symbol) {
        this.symbol = symbol;
    }
}


class Position {
    x: number;
    y: number;
    token: Token;

    constructor(x: number, y: number, token: Token = new Token(".")) {
        this.x = x;
        this.y = y;
        this.token = token;
    }
}

class Line {
    positions: Array<Position>;
}

class Board {

    positions: Array<Position> = [];
    size: number;
    lines: Array<Line> = [];
    winner: string = "";

    constructor(size: number = 3) {
        this.size = size;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                this.positions.push(new Position(x, y));
            }
        }
    }

    setWinner(value) {
        if (value != ".") {
            this.winner = value;
        }
    }

    getPosition(x: number, y: number) {
        let p = this.positions[x + (y * this.size)];
        return p;
    }

    checkDiagonal1() {

        let counts = {"x": 0, "o": 0};

        for (let x = 0; x < this.size; x++) {
            let p = this.getPosition(x, x);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }


        let keys = Object.keys(counts);
        for (let k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }
    }


    checkDiagonal2() {

        let counts = {"x": 0, "o": 0};

        for (let x = 0; x < this.size; x++) {
            let p = this.getPosition(this.size - x - 1, x);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }

        let keys = Object.keys(counts);
        for (let k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }

    }

    checkColumn(n: number) {

        let counts = {"x": 0, "o": 0};

        for (let y = 0; y < this.size; y++) {
            let p = this.getPosition(n, y);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }

        let keys = Object.keys(counts);
        for (let k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }

    }

    checkRow(n: number) {

        let counts = {"x": 0, "o": 0};

        for (let x = 0; x < this.size; x++) {
            let p = this.getPosition(x, n);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }

        let keys = Object.keys(counts);
        for (let k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }

    }

    whoHasWon() {

        this.checkDiagonal1();

        this.checkDiagonal2();

        for (let n = 0; n < this.size; n++) {
            this.checkRow(n);
            this.checkColumn(n);
        }
    }

    toString() {
        let output = [];

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let p = this.getPosition(x, y);
                output.push(" " + p.token.symbol);
            }
            output.push('\n');
        }

        if (this.winner != "" && this.winner != ".") {
            output.push(this.winner + " has won the game!")
        }

        return output.join('');
    }

    render() {
        console.log(this.toString());
    }

    add(x: number, y: number, token: Token) {
        let p = this.getPosition(x, y);
        p.token = token;

        this.whoHasWon();
    }
}

class Game {

    lines = [];
    board: Board;

    constructor(size: number = 3) {
        this.board = new Board(size);
        this.lines = [];
    }
}

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

