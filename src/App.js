import Leaderboard from './Components/Leaderboard';
import AppSettings from './Components/Settings/Application';
import GameSettings from './Components/Settings/Game';
import TitleScreen from './Components/TitleScreen';
import MultiplayerOptions from './Components/Settings/MultiplayerOptions';
import Instructions from './Components/Instructions';
import GameScreen from './Components/Game/GameScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="/gamesettings" element={<GameSettings />} />
          <Route path="/multiplayeroptions" element={<MultiplayerOptions />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<GameScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;