"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const Messages_1 = require("./Messages");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            // const message = JSON.parse(data.toString());
            let message;
            try {
                message = JSON.parse(data.toString());
            }
            catch (error) {
                console.error("Failed to parse JSON:", error);
                return;
            }
            if (message.type === Messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === Messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    if (game.player1 === socket) {
                        console.log("player 1");
                    }
                    else {
                        console.log("player 2");
                    }
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
