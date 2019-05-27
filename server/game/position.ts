import {Token} from "./token";

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

export {Position};