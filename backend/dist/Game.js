"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.makeMove = (socket, move) => {
            console.log("moves count", this.movesCount);
            if (this.movesCount % 2 === 0 && socket !== this.player1) {
                console.log("early return 1");
                return;
            }
            if (this.movesCount % 2 === 1 && socket !== this.player2) {
                console.log("early return 2");
                return;
            }
            try {
                const result = this.board.move(move);
            }
            catch (error) {
                console.log(error);
                return;
            }
            if (this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: Messages_1.GAME_OVER,
                    payload: {
                        winner: this.board.turn() === "w" ? this.player2 : this.player1,
                    },
                }));
                this.player2.send(JSON.stringify({
                    type: Messages_1.GAME_OVER,
                    payload: {
                        winner: this.board.turn() === "w" ? this.player2 : this.player1,
                    },
                }));
                return;
            }
            if (this.movesCount % 2 === 0) {
                console.log("sending to player 2");
                this.player2.send(JSON.stringify({
                    type: Messages_1.MOVE,
                    payload: move,
                }));
            }
            else {
                console.log("sending to player 1");
                this.player1.send(JSON.stringify({
                    type: Messages_1.MOVE,
                    payload: move,
                }));
            }
            this.movesCount++;
        };
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.movesCount = 0;
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
}
exports.Game = Game;
