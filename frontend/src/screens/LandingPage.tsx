import { useNavigate } from "react-router-dom"

function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="pt-8 max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="flex items-center justify-center">
                <img src= '../../public/chessBoard.png' alt="PowChess Logo" className="max-w-full h-screen" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Play Chess Online</h1>
                <button onClick={() => navigate('/game')} className="bg-green-500 hover:bg-green-700 text-white mt-4 p-2 rounded-md">Start Game</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage