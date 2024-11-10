import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from "../types/message";
import { Chess } from "chess.js";

function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState<boolean>(false);

  // console.log("socket thing is it", socket);
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          setStarted(true); 
          setBoard(chess.board());
          console.log("Game initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting.....</div>;
  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg ">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 bg-red-200 w-full flex justify-center">
            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
          </div>
          <div className="col-span-2 bg-slate-800 flex justify-center items-center">
            <div className="">
             {!started && <Button
                onClick={() =>
                  socket?.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  )
                }
              >
                Start Game
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
