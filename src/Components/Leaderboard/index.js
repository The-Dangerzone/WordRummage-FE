import { Link } from 'react-router-dom';
import { useContext } from 'react';
import click from "../../assets/audio/button_click.mp3";
import Rain from '../Rain';
import { SettingsContext } from '../../Context/Settings';
import './styles.css'

const clickAudio = new Audio(click);

const Leaderboard = () => {

  const { effectVolume } = useContext(SettingsContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-rain-container'>
        <Rain />
      </div>
      <div className='leaderboard-title'>
        <h1>Leaderboard</h1>
      </div>
      <div className='under-development'>
        <h1>Currently Under Development</h1>
      </div>

      <Link to="/"><button className="pulse-button"  onClick={handleClick}>Back</button></Link>
    </div>
  );
}

export default Leaderboard;