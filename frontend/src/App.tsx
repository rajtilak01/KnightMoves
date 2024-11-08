import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./screens/Game";
import LandingPage from "./screens/LandingPage";

function App() {
  return (
    <div className="h-screen bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
