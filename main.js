var Token = /** @class */ (function () {
    function Token(symbol) {
        this.symbol = symbol;
    }
    return Token;
}());
var Position = /** @class */ (function () {
    function Position(x, y, token) {
        if (token === void 0) { token = new Token("."); }
        this.x = x;
        this.y = y;
        this.token = token;
    }
    return Position;
}());
var Line = /** @class */ (function () {
    function Line() {
    }
    return Line;
}());
var Board = /** @class */ (function () {
    function Board(size) {
        if (size === void 0) { size = 3; }
        this.positions = [];
        this.lines = [];
        this.winner = "";
        this.size = size;
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {
                this.positions.push(new Position(x, y));
            }
        }
    }
    Board.prototype.setWinner = function (value) {
        if (value != ".") {
            this.winner = value;
        }
    };
    Board.prototype.getPosition = function (x, y) {
        var p = this.positions[x + (y * this.size)];
        return p;
    };
    Board.prototype.checkDiagonal1 = function () {
        var counts = { "x": 0, "o": 0 };
        for (var x = 0; x < this.size; x++) {
            var p = this.getPosition(x, x);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }
        var keys = Object.keys(counts);
        for (var k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }
    };
    Board.prototype.checkDiagonal2 = function () {
        var counts = { "x": 0, "o": 0 };
        for (var x = 0; x < this.size; x++) {
            var p = this.getPosition(this.size - x - 1, x);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }
        var keys = Object.keys(counts);
        for (var k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }
    };
    Board.prototype.checkColumn = function (n) {
        var counts = { "x": 0, "o": 0 };
        for (var y = 0; y < this.size; y++) {
            var p = this.getPosition(n, y);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }
        var keys = Object.keys(counts);
        for (var k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }
    };
    Board.prototype.checkRow = function (n) {
        var counts = { "x": 0, "o": 0 };
        for (var x = 0; x < this.size; x++) {
            var p = this.getPosition(x, n);
            if (p.token.symbol != ".") {
                counts[p.token.symbol]++;
            }
        }
        var keys = Object.keys(counts);
        for (var k = 0; k < keys.length; k++) {
            if (counts[keys[k]] === 3) {
                this.setWinner(keys[k]);
                return;
            }
        }
    };
    Board.prototype.whoHasWon = function () {
        this.checkDiagonal1();
        this.checkDiagonal2();
        for (var n = 0; n < this.size; n++) {
            this.checkRow(n);
            this.checkColumn(n);
        }
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
        if (this.winner != "" && this.winner != ".") {
            output.push(this.winner + " has won the game!");
        }
        return output.join('');
    };
    Board.prototype.render = function () {
        console.log(this.toString());
    };
    Board.prototype.add = function (x, y, token) {
        var p = this.getPosition(x, y);
        p.token = token;
        this.whoHasWon();
    };
    return Board;
}());
var Game = /** @class */ (function () {
    function Game(size) {
        if (size === void 0) { size = 3; }
        this.lines = [];
        this.board = new Board(size);
        this.lines = [];
    }
    return Game;
}());
var g = new Game();
g.board.add(0, 0, new Token('x'));
g.board.render();
g.board.add(1, 1, new Token('x'));
g.board.render();
g.board.add(2, 2, new Token('x'));
g.board.render();
var g2 = new Game();
g2.board.add(2, 0, new Token('x'));
g2.board.render();
g2.board.add(1, 1, new Token('x'));
g2.board.render();
g2.board.add(0, 2, new Token('x'));
g2.board.render();
var g3 = new Game();
g3.board.add(0, 2, new Token('o'));
g3.board.render();
g3.board.add(1, 2, new Token('o'));
g3.board.render();
g3.board.add(2, 2, new Token('o'));
g3.board.render();
//# sourceMappingURL=main.js.map