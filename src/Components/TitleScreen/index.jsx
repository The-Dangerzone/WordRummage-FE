import { useContext, useEffect, } from "react";
import { SettingsContext } from "../../Context/Settings";
import { UserContext } from "../../Context/User";
import { Link } from "react-router-dom";
import Rain from "../Rain";
import "./styles.css";
import click from "../../assets/audio/button_click.mp3";
import axios from "axios";
const clickAudio = new Audio(click);

const TitleScreen = () => {
  const { resetGame, effectVolume } = useContext(SettingsContext);

  const { validUser } = useContext(UserContext);

  useEffect(() => { 
    resetGame();
  }, []);

 
  // placeholder handlers
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

  const handleUserProfile = () => {
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
            <button className="pulse-button" onClick={handleSinglePlayer}>Single Player</button>
          </Link>
          <Link to="/multiplayeroptions">
            <button className="pulse-button"  onClick={handleMultiplayer}>Multiplayer</button>
          </Link>
          { validUser.displayName && 
          <Link to="/userprofile" state={{ user: validUser}}>
            <button  className="pulse-button" onClick={handleUserProfile}>Profile</button>
          </Link>
          }
          
        </div>
        <div className="button-group">
          <Link to="/settings">
            <button  className="pulse-button" onClick={handleSettings}>Settings</button>
          </Link>
          <Link to="/instructions">
            <button  className="pulse-button" onClick={handleHowToPlay}>How to Play</button>
          </Link>
          <Link to="/leaderboard">
            <button  className="pulse-button" onClick={handleLeaderBoard}>Leaderboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
