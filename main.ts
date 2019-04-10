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
    neighbors: Array<Position>;

    constructor(
        x: number,
        y: number,
        token: Token = new Token("."),
        neighbors: Array<Position> = []
    ) {
        this.x = x;
        this.y = y;
        this.token = token;
        this.neighbors = neighbors;
    }
}


class Direction {
    x: number;
    y: number;
    name: string;

    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

// CARDINAL DIRECTIONS STARTING WITH NORTH GOING CLOCKWISE
let DIRECTIONS = function (): Array<Direction> {

    const CC = 0;  // CENTER
    const UP = -1; // UP
    const RT = 1; // RIGHT
    const DN = 1; // DOWN
    const LT = -1; // LEFT

    return [
        new Direction('n-', CC, UP),
        new Direction('ne', RT, UP),
        new Direction('e-', RT, CC),
        new Direction('se', RT, DN),
        new Direction('s-', CC, DN),
        new Direction('sw', LT, DN),
        new Direction('w-', LT, CC),
        new Direction('nw', LT, UP)
    ];
}();

class Board {

    positions: Array<Position> = [];
    size: number;
    winner: string = "";
    goal: number;

    constructor(size: number = 3, goal = 3) {
        this.size = size;
        this.goal = goal;
        this.createPositions();
        this.createNeighbors();
    }

    createPositions() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let p = new Position(x, y);
                this.positions.push(p);
            }
        }
    }

    createNeighbors() {
        this.positions.map((p) => {
            DIRECTIONS.map((d) => {
                let n = this.getPosition(
                    p.x + d.x,
                    p.y + d.y
                );
                p.neighbors.push(n);
            });
        });
    }

    setWinner(value) {
        if (value != ".") {
            this.winner = value;
        }
    }

    getPosition(x: number, y: number) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return undefined;
        }
        return this.positions[x + (y * this.size)];
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

        if (this.winner != undefined && this.winner != "" && this.winner != ".") {
            output.push(this.winner + " has won the game!")
        }

        return output.join('');
    }

    render() {

        let output = this.toString();

        if (window && window.document && window.document.body) {
            let p = document.createElement('pre');
            p.innerHTML = output;
            window.document.body.appendChild(p);
        } else {
            console.log(output);
        }
    }

    static sameInDirection(p, direction) {

        let next = p.neighbors[direction];
        let count = 0;

        while (next != undefined && next.token.symbol == p.token.symbol) {
            count++;
            next = next.neighbors[direction];
        }
        return count;

    }

    evaluateWin(p) {

        let half = Math.floor(DIRECTIONS.length / 2);

        for (let i = 0; i < half; i++) {
            let opposite = i + half;
            let count = 1;
            count += Board.sameInDirection(p, i);
            count += Board.sameInDirection(p, opposite);
            if (count >= this.goal) {
                this.setWinner(p.token.symbol);
                return;
            }
        }

    }

    add(x: number, y: number, token: Token) {
        let p = this.getPosition(x, y);
        p.token = token;
        this.evaluateWin(p);
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
