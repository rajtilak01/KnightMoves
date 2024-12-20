import { WebSocket } from "ws";
import { Chess } from 'chess.js'

import { GAME_OVER, INIT_GAME, MOVE } from './Messages'
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess
    private startTime: Date;
    private movesCount: number;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.movesCount = 0;
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    
    makeMove = (socket: WebSocket, move: {
        from: string,
        to: string,
    }) => {
        // console.log("moves count", this.movesCount);
        console.log("move it is", move);
        if(this.movesCount % 2 === 0 && socket !== this.player1) {
            console.log("early return 1");
            return;
        }
        if(this.movesCount % 2 === 1 && socket !== this.player2) {
            console.log("early return 2");
            return;
        }
        try {
            const result = this.board.move(move);
        } catch (error) {
            console.log(error);
            return;
        }

        if(this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? this.player2 : this.player1,
                },
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? this.player2 : this.player1,
                },
            }));
            return;
        }

        if(this.movesCount % 2 === 0) {
            console.log("sending to player 2");
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move,
            }));
        } else {
            console.log("sending to player 1");
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move,
            }));
        }   

        this.movesCount++;
    }
}
