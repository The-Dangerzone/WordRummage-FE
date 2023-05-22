import { useContext, useEffect, } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Link } from "react-router-dom";
import Rain from "../Rain";
import "./styles.css";

const TitleScreen = () => {
  const { resetGame } = useContext(SettingsContext);

  useEffect(() => { 
    resetGame();
  }, []);


  const handleSinglePlayer = () => {
    // Placeholder in case we need it
  };

  const handleSettings = () => {
    // Placeholder in case we need it
  };

  const handleHowToPlay = () => {
    // Placeholder in case we need it
  };

  const handleLeaderBoard = () => {
    // Placeholder in case we need it
  };

  const handleMultiplayer = () => {
    // Placeholder in case we need it
  };

  return (
    <div className="title-screen-container">
      <Rain />
      <div className="title-screen-content">
        <h1>Word Rummage</h1>
        <div className="button-group">
          <Link to="/gamesettings">
            <button onClick={handleSinglePlayer}>Single Player</button>
          </Link>
          <Link to="/multiplayeroptions">
            <button onClick={handleMultiplayer}>Multiplayer</button>
          </Link>
        </div>
        <div className="button-group">
          <Link to="/settings">
            <button onClick={handleSettings}>Settings</button>
          </Link>
          <Link to="/instructions">
            <button onClick={handleHowToPlay}>How to Play</button>
          </Link>
          <Link to="/leaderboard">
            <button onClick={handleLeaderBoard}>Leaderboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
