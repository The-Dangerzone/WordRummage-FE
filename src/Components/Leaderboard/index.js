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
  const { leaderboard, setLeaderboard } = useContext(UserContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const getLeaderboard = async () => {
    let data = await axios.get(`${process.env.REACT_APP_SERVER}/leaderboard`);
    setLeaderboard(data.data);
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
      <div className='under-development'>
      <table>
          <thead>
            <th>USERNAME</th>
            <th>highScore</th>
          </thead>
          {leaderboard.map(user => {
            return (
              <tr>
                <td>{user.displayName}</td>
                <td>{user.normalMode.highScore}</td>
                <button>Profile</button>
              </tr>
            )
          })}
        </table>
      </div>

      <Link to="/"><button className="pulse-button" onClick={handleClick}>Back</button></Link>
    </div>
  );
}

export default Leaderboard;