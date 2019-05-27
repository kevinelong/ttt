class Direction {
    x: number;
    y: number;
    name: string;

    constructor(name: string, x: number, y: number) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

class CardinalDirections {
    static get(): Array<Direction> {
        // CARDINAL DIRECTIONS STARTING WITH NORTH GOING CLOCKWISE
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
    }
}

export {Direction, CardinalDirections};