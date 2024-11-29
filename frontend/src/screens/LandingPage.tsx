import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="pt-8 max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="flex items-center justify-center">
                {/* <img src= '../../public/chessboard.jpeg' alt="PowChess Logo" className="max-w-full h-auto" /> */}
                <img src= '/chessboard.jpeg' alt="PowChess Logo" className="max-w-full h-auto" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Play Chess Online</h1>
                <Button onClick={() => navigate('/game')}>
                    Play Online
                </Button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage