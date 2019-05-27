import {Direction, CardinalDirections} from "./direction";
import {Position} from "./position";
import {Token} from "./token";

class Board {

    positions: Array<Position> = [];
    size: number;
    winner: string = "";
    DIRECTIONS: Array<Direction>;

    constructor(size: number = 3) {
        this.size = size;
        this.DIRECTIONS = CardinalDirections.get();
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
        this.positions.map((p:Position) => {
            this.DIRECTIONS.map((d:Direction) => {
                let n = this.getPosition(
                    p.x + d.x,
                    p.y + d.y
                );
                p.neighbors.push(n);
            });
        });
    }

    setWinner(value:string) {
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


    toArray() {
        return this.positions.map((p)=>{return p.token.symbol});
    }
    //
    // toJSON() {
    //     return JSON.stringify(this.toArray());
    // }

    render() {

        let output = this.toString();

        // if (window && window.document && window.document.body) {
        //     let p = document.createElement('pre');
        //     p.innerHTML = output;
        //     window.document.body.appendChild(p);
        // } else {
        console.log(output);
        // }
    }

    static sameInDirection(p:Position, direction:number) {

        let next = p.neighbors[direction];
        let count = 0;

        while (next != undefined && next.token.symbol == p.token.symbol) {
            count++;
            next = next.neighbors[direction];
        }
        return count;

    }


    add(x: number, y: number, token: Token) {
        let p = this.getPosition(x, y);
        p.token = token;
    }

}
export {Board};