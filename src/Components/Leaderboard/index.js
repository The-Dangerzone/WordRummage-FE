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
  const [error, setError] = useState(null);

  const { effectVolume } = useContext(SettingsContext);
  const { leaderboard, setLeaderboard, insaneLeaderboard, setInsaneLeaderboard } = useContext(UserContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const getLeaderboard = async () => {
    try {
      let data = await axios.get(`${process.env.REACT_APP_SERVER}/leaderboard`);
      setLeaderboard(data.data.normalLeaderboard);
      setInsaneLeaderboard(data.data.insaneLeaderboard);
    } catch (err) {
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getLeaderboard();
  }, []);

  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-rain-container'>
        <Rain />
      </div>
      <div className='leaderboard-title'>
        <h1>Leaderboard</h1>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='leaderboard-wrapper'>
          <div className='leaderboard'>
            <h2>NORMAL MODE</h2>
            {leaderboard.map((user, idx) => (
              <div key={idx} className='leaderboard-item'>
                <Link to="/userprofile" state={{ user }} style={{ color: 'white' }}>
                  {user.displayName}
                </Link>
                <span>{user.normalMode.highScore}</span>
              </div>
            ))}
          </div>

          <div className='leaderboard'>
            <h2>INSANE MODE</h2>
            {insaneLeaderboard.map((user, idx) => (
              <div key={idx} className='leaderboard-item'>
                <Link to="/userprofile" state={{ user }} style={{ color: 'white' }}>
                  {user.displayName}
                </Link>
                <span>{user.insaneMode.highScore}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/"><button className="pulse-button" onClick={handleClick}>Back</button></Link>
    </div>
  );
};

export default Leaderboard;
