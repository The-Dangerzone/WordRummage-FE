import { Link } from 'react-router-dom';
import { useContext } from 'react';
import click from "../../../assets/audio/button_click.mp3";
import { Slider, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { SettingsContext } from '../../../Context/Settings';
import Rain from '../../Rain';
import './styles.css'


const clickAudio = new Audio(click);

const AppSettings = () => {

  const { effectVolume, setEffectVolume, musicVolume, setMusicVolume, } = useContext(SettingsContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  const handleEffectVolumeChange = (event, newValue) => {
    setEffectVolume(newValue);
  };

  const handleMusicVolumeChange = (event, newValue) => {
    setMusicVolume(newValue);
  };

  return (
    <div className='app-settings-container'>

      <div className='app-settings-rain-container'>
        <Rain />
      </div>
      <div className='app-settings-title'>
        <h1>Settings</h1>
      </div>
      <div className='volume-container'>
        <div>
          <Typography id="effects-volume-slider" gutterBottom>
            Effects Volume
          </Typography>
          <Slider
            value={effectVolume}
            onChange={handleEffectVolumeChange}
            min={0}
            max={100}
            step={1}
            aria-labelledby="volume-slider"
            style={{ width: 200 }}
          />
          <VolumeUpIcon className='volume-icon' style={{ fontSize: 30, marginLeft: 15 }} />
        </div>
        <div>
          <Typography id="music-volume-slider" gutterBottom>
            Music Volume
          </Typography>
          <Slider
            value={musicVolume}
            onChange={handleMusicVolumeChange}
            min={0}
            max={100}
            step={1}
            aria-labelledby="volume-slider"
            style={{ width: 200 }}
          />
          <VolumeUpIcon className='volume-icon' style={{ fontSize: 30, marginLeft: 15 }} />
        </div>
      </div>
      <Link to="/"><button onClick={handleClick}>Back</button></Link>
    </div>

  );
}

export default AppSettings;