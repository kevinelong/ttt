import {Board} from "./board";
import {Position} from "./position";
import {Token} from "./token";
import {Direction, CardinalDirections} from "./direction";

class Game {

    lines: Array<Position> = [];

    board: Board;
    goal: number;
    size: number;
    status: string;
    DIRECTIONS: Array<Direction>;

    constructor(size: number = 3, goal: number = 2) {
        this.status = "Game Begins";
        this.size = size;
        this.goal = goal;
        this.board = new Board(size);
        this.lines = [];
        this.DIRECTIONS = CardinalDirections.get();
    }

    evaluateWin(p: Position) {

        let half = Math.floor(this.DIRECTIONS.length / 2);

        for (let i = 0; i < half; i++) {
            let opposite = i + half;
            let count = 1;
            count += Board.sameInDirection(p, i);
            count += Board.sameInDirection(p, opposite);

            if (count >= this.goal) {
                this.board.setWinner(p.token.symbol);
                this.status = `Winner: '${p.token.symbol}'.`;

                return;
            }
        }

    }

    add(x: number, y: number, symbol: string = 'x') {
        this.status = `Token Placed at x='${x}', y='${y}'.`;
        let token = new Token(symbol);
        this.board.add(x, y, token);
        let p = this.board.getPosition(x, y);
        this.evaluateWin(p);
        return symbol;
    }

    render() {
        this.board.render();
    }

    getState() {
        return `{"status":"${this.status}","size":"${this.size}","board":${this.board.toJSON()}}`;
    }
}

export {Game};