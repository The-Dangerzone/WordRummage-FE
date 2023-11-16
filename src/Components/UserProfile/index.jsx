import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../Context/User';
import { SettingsContext } from "../../Context/Settings";
import click from "../../assets/audio/button_click.mp3";
import "./styles.css"
import DisplayName from "../Auth/DisplayName";
import axios from "axios";

const clickAudio = new Audio(click);

const UserProfile = () => {

  // const { validUser } = useContext(UserContext);
  const location = useLocation();
  const { user } = location.state;
  const { effectVolume } = useContext(SettingsContext);
  const { validUser, setValidUser, displayNamePopup, setDisplayNamePopup } = useContext(UserContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const handleChangeName = () => {
    setDisplayNamePopup(true);
  }

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    navigate('/');
    setValidUser({});
    setDisplayNamePopup(true);
    await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${validUser._id}`);
  }

  return (

    <div className="user-profile">
      <h1>{user.displayName}</h1>
      {
        validUser.displayName === user.displayName &&
        <div>
          <button onClick={handleChangeName}>Change Name</button>
          <button onClick={handleDeleteUser}>Delete User</button>
        </div>
      }

      {displayNamePopup && (
        <DisplayName />
      )}
      <div className="user-stats">
        <h2>USER STATS: NORMAL MODE</h2>
        <div className="user-accuracy">
          <h3>ACCURACY</h3>
          <p>CORRECT: {user.normalMode.accuracy.correct}</p>
          <p>INCORRECT: {user.normalMode.accuracy.incorrect}</p>
          <p>{user.normalMode.accuracy.percentage}%</p>
          <h3>OVERALL HIGHSCORE: {user.normalMode.highScore}</h3>
          <h3>STREAK: {user.normalMode.maxStreak}</h3>
          <h3>ROUND: {user.normalMode.highestRound}</h3>
        </div>
      </div>
      <div className="user-stats">
        <h2>USER STATS: INSANE MODE</h2>
        <div className="user-accuracy">
          <h3>ACCURACY</h3>
          <p>CORRECT: {user.insaneMode.accuracy.correct}</p>
          <p>INCORRECT: {user.insaneMode.accuracy.incorrect}</p>
          <p>{user.insaneMode.accuracy.percentage}%</p>
          <h3>OVERALL HIGHSCORE: {user.insaneMode.highScore}</h3>
          <h3>STREAK: {user.insaneMode.maxStreak}</h3>
          <h3>ROUND: {user.insaneMode.highestRound}</h3>
        </div>
      </div>
      <Link to="/"><button className="pulse-button" onClick={handleClick}>Back</button></Link>
    </div>

  );
};

export default UserProfile;