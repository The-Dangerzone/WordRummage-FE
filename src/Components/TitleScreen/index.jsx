import { useContext, useEffect, } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Link } from "react-router-dom";
import Rain from "../Rain";
import "./styles.css";
import click from "../../assets/audio/button_click.mp3";
const clickAudio = new Audio(click);

const TitleScreen = () => {
  const { resetGame, effectVolume } = useContext(SettingsContext);

  useEffect(() => { 
    resetGame();
  }, []);


  const handleSinglePlayer = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  const handleSettings = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  const handleHowToPlay = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  const handleLeaderBoard = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  const handleMultiplayer = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
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
