import { WebSocket } from "ws";

import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Messages";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];    
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            // const message = JSON.parse(data.toString());

            let message;
            try {
                message = JSON.parse(data.toString());
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                return;
            }
            if(message.type === INIT_GAME) {
                if(this.pendingUser) {
                    //start game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            } 
            if(message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    if(game.player1 === socket) { console.log("player 1"); }
                    else { console.log("player 2"); }
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}   
