import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import click from "../../assets/audio/button_click.mp3";
import Rain from '../Rain';
import { SettingsContext } from '../../Context/Settings';
import './styles.css';
import axios from 'axios';
import { UserContext } from '../../Context/User';

const clickAudio = new Audio(click);

const Leaderboard = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { effectVolume } = useContext(SettingsContext);
  const { leaderboard, setLeaderboard, insaneLeaderboard, setInsaneLeaderboard } = useContext(UserContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const getLeaderboard = async () => {
    let data = await axios.get(`${process.env.REACT_APP_SERVER}/leaderboard`);
    setLeaderboard(data.data.normalLeaderboard);
    setInsaneLeaderboard(data.data.insaneLeaderboard);
  }

  useEffect(() => {
    setIsLoading(true);
    getLeaderboard();
    setIsLoading(false);
  }, []);




  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-rain-container'>
        <Rain />
      </div>
      <div className='leaderboard-title'>
        <h1>Leaderboard</h1>
      </div>
      {/* change className */}
      <div className='under-development'>
        <h2>NORMAL MODE</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Highscore</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>{user.displayName}</td>
                  <td>{user.normalMode.highScore}</td>
                  <td>
                    <Link to="/userprofile" state={{ user }}>
                      Profile
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* change className */}
      <div className='under-development'>
        <h2>INSANE MODE</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Highscore</th>
            </tr>
          </thead>
          <tbody>
            {insaneLeaderboard.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>{user.displayName}</td>
                  <td>{user.insaneMode.highScore}</td>
                  <td>
                    <Link to="/userprofile" state={{ user }}>
                      Profile
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Link to="/"><button className="pulse-button" onClick={handleClick}>Back</button></Link>
    </div>
  );
}

export default Leaderboard;