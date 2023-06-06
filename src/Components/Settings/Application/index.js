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
    clickAudio.play()
  };

  const handleEffectVolumeChange = (event, newValue) => {
    setEffectVolume(newValue);
  };

  return (
    <div className='app-settings-container'>

      <div className='app-settings-rain-container'>
        <Rain />
        <p>App Settings</p>
        <div className='settings-content'>
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
            <VolumeUpIcon className='volume-icon' style={{ fontSize: 30 }} />
          </div>
        </div>
        <Link to="/"><button onClick={handleClick}>Back</button></Link>
      </div>
    </div>
  );
}

export default AppSettings;