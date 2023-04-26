import './App.css';
import Leaderboard from './Components/Leaderboard';
import AppSettings from './Components/Settings/Application';
import GameSettings from './Components/Settings/Game';
import TitleScreen from './Components/TitleScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="/gamesettings" element={<GameSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;