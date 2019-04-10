var Token = /** @class */ (function () {
    function Token(symbol) {
        this.symbol = symbol;
    }
    return Token;
}());
var Position = /** @class */ (function () {
    function Position(x, y, token, neighbors) {
        if (token === void 0) { token = new Token("."); }
        if (neighbors === void 0) { neighbors = []; }
        this.x = x;
        this.y = y;
        this.token = token;
        this.neighbors = neighbors;
    }
    return Position;
}());
var Direction = /** @class */ (function () {
    function Direction(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
    return Direction;
}());
// CARDINAL DIRECTIONS STARTING WITH NORTH GOING CLOCKWISE
var DIRECTIONS = function () {
    var CC = 0; // CENTER
    var UP = -1; // UP
    var RT = 1; // RIGHT
    var DN = 1; // DOWN
    var LT = -1; // LEFT
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
var Board = /** @class */ (function () {
    function Board(size, goal) {
        if (size === void 0) { size = 3; }
        if (goal === void 0) { goal = 3; }
        this.positions = [];
        this.winner = "";
        this.size = size;
        this.goal = goal;
        this.createPositions();
        this.createNeighbors();
    }
    Board.prototype.createPositions = function () {
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                var p = new Position(x, y);
                this.positions.push(p);
            }
        }
    };
    Board.prototype.createNeighbors = function () {
        var _this = this;
        this.positions.map(function (p) {
            DIRECTIONS.map(function (d) {
                var n = _this.getPosition(p.x + d.x, p.y + d.y);
                p.neighbors.push(n);
            });
        });
    };
    Board.prototype.setWinner = function (value) {
        if (value != ".") {
            this.winner = value;
        }
    };
    Board.prototype.getPosition = function (x, y) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return undefined;
        }
        return this.positions[x + (y * this.size)];
    };
    Board.prototype.toString = function () {
        var output = [];
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                var p = this.getPosition(x, y);
                output.push(" " + p.token.symbol);
            }
            output.push('\n');
        }
        if (this.winner != undefined && this.winner != "" && this.winner != ".") {
            output.push(this.winner + " has won the game!");
        }
        return output.join('');
    };
    Board.prototype.render = function () {
        var output = this.toString();
        if (window && window.document && window.document.body) {
            var p = document.createElement('pre');
            p.innerHTML = output;
            window.document.body.appendChild(p);
        }
        else {
            console.log(output);
        }
    };
    Board.sameInDirection = function (p, direction) {
        var next = p.neighbors[direction];
        var count = 0;
        while (next != undefined && next.token.symbol == p.token.symbol) {
            count++;
            next = next.neighbors[direction];
        }
        return count;
    };
    Board.prototype.evaluateWin = function (p) {
        var half = Math.floor(DIRECTIONS.length / 2);
        for (var i = 0; i < half; i++) {
            var opposite = i + half;
            var count = 1;
            count += Board.sameInDirection(p, i);
            count += Board.sameInDirection(p, opposite);
            if (count >= this.goal) {
                this.setWinner(p.token.symbol);
                return;
            }
        }
    };
    Board.prototype.add = function (x, y, token) {
        var p = this.getPosition(x, y);
        p.token = token;
        this.evaluateWin(p);
    };
    return Board;
}());
var Game = /** @class */ (function () {
    function Game(size, goal) {
        if (size === void 0) { size = 3; }
        if (goal === void 0) { goal = 2; }
        this.lines = [];
        this.board = new Board(size, goal);
        this.lines = [];
    }
    return Game;
}());
//# sourceMappingURL=main.js.map