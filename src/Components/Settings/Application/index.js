import { Link } from 'react-router-dom';
import { useContext } from 'react';
import click from "../../../assets/audio/button_click.mp3";
import { Slider, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { SettingsContext } from '../../../Context/Settings';
import Rain from '../../Rain';
import './styles.css'

const clickAudio = new Audio(click);

const AppSettings = () => {
  const { effectVolume, setEffectVolume, musicVolume, setMusicVolume } = useContext(SettingsContext);

  const handleClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play();
  };

  const handleEffectVolumeChange = (event, newValue) => {
    setEffectVolume(newValue);
  };

  const handleMusicVolumeChange = (event, newValue) => {
    setMusicVolume(newValue);
  };

  const getVolumeIcon = (volume) => {
    if (volume === 0) {
      return <VolumeOffIcon className='volume-icon' style={{ fontSize: 30, marginLeft: 15 }} />;
    } else if (volume <= 50) {
      return <VolumeDownIcon className='volume-icon' style={{ fontSize: 30, marginLeft: 15 }} />;
    } else {
      return <VolumeUpIcon className='volume-icon' style={{ fontSize: 30, marginLeft: 15 }} />;
    }
  };

  return (
    <div className='app-settings-container'>
      <div className='app-settings-rain-container'>
        <Rain />
      </div>
      <div className='app-settings-title'>
        <h1>Application Settings</h1>
      </div>
      <div className='volume-container'>
        <div>
          <h1>Audio Settings</h1>
          <div className='slider-container'>
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
              {getVolumeIcon(effectVolume)}
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
              {getVolumeIcon(musicVolume)}
            </div>
          </div>
        </div>
      </div>
      <Link to="/"><button onClick={handleClick}>Back</button></Link>
    </div>
  );
};

export default AppSettings;
