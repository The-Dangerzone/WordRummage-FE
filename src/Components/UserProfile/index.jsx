import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../Context/User';
import { SettingsContext } from "../../Context/Settings";
import click from "../../assets/audio/button_click.mp3";
import "./styles.css";
import DisplayName from "../Auth/DisplayName";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const clickAudio = new Audio(click);

const UserProfile = () => {
  const location = useLocation();
  const { user } = location.state;
  const { effectVolume } = useContext(SettingsContext);
  const { validUser, setValidUser, displayNamePopup, setDisplayNamePopup } = useContext(UserContext);
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const handleChangeName = () => {
    setDisplayNamePopup(true);
  }

  const handleDeleteUser = async () => {
    try {
      logout();
      navigate('/');
      setValidUser({});
      await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${validUser._id}`);
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <div className="user-profile">
      <h1>{user.displayName}</h1>
      {validUser.displayName === user.displayName && (
        <div>
          <button className='pulse-button' onClick={handleChangeName}>Change Name</button>
          <button className='pulse-button' onClick={handleDeleteUser}>Delete User</button>
        </div>
      )}

      {displayNamePopup && (
        <DisplayName />
      )}
      <div className="user-stats-container">
        <div className="user-stats">
          <h2>Normal Mode Stats</h2>
          <div className="user-accuracy">
            <p>Correct Letters Clicked: {user.normalMode.accuracy.correct}</p>
            <p>Incorrect Letters Clicked: {user.normalMode.accuracy.incorrect}</p>
            <p>Correct Accuracy Percentage: {user.normalMode.accuracy.percentage}%</p>
            <p>Highest Score: {user.normalMode.highScore}</p>
            <p>Best Streak: {user.normalMode.maxStreak}</p>
            <p>Highest Round Reached: {user.normalMode.highestRound}</p>
          </div>
        </div>
        <div className="user-stats">
          <h2>Insane Mode Stats</h2>
          <div className="user-accuracy">
          <p>Correct Letters Clicked: {user.insaneMode.accuracy.correct}</p>
            <p>Incorrect Letters Clicked: {user.insaneMode.accuracy.incorrect}</p>
            <p>Correct Accuracy Percentage: {user.insaneMode.accuracy.percentage}%</p>
            <p>Highest Score: {user.insaneMode.highScore}</p>
            <p>Best Streak: {user.insaneMode.maxStreak}</p>
            <p>Highest Round Reached: {user.insaneMode.highestRound}</p>
          </div>
        </div>
        <div className="user-stats">
          <h2>Custom Mode Stats</h2>
          <div className="user-accuracy">
          <p>Correct Letters Clicked: {user.customMode.accuracy.correct}</p>
            <p>Incorrect Letters Clicked: {user.customMode.accuracy.incorrect}</p>
            <p>Correct Accuracy Percentage: {user.customMode.accuracy.percentage}%</p>
            <p>Highest Score: {user.customMode.highScore}</p>
            <p>Best Streak: {user.customMode.maxStreak}</p>
            <p>Highest Round Reached: {user.customMode.highestRound}</p>
          </div>
        </div>
      </div>
      <Link to="/"><button className="pulse-button" onClick={handleClick}>Back</button></Link>
    </div>
  );
};

export default UserProfile;
