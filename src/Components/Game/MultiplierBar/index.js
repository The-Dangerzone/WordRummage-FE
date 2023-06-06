import { useState, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Box, Typography } from '@mui/material';
import './styles.css';
import click from "../../../assets/audio/button_click.mp3";

const clickAudio = new Audio(click);

const MultiplierBar = () => {
  const { streak, multiplier, displayScore, setGameOver, effectVolume } = useContext(SettingsContext);
  const [showQuitMessage, setShowQuitMessage] = useState(false);

  const getBoxColor = (boxIndex) => {
    if (boxIndex < 2) {
      return 'yellow';
    } else if (boxIndex < 5) {
      return 'orange';
    } else if (boxIndex === 5) {
      return 'red';
    } else {
      return 'transparent';
    }
  };

  const renderBoxes = () => {
    const boxes = [];
    const maxStreak = Math.min(streak, 6); // Ensure there are at most 6 boxes
    
    for (let i = 0; i < maxStreak; i++) {
      const color = i < streak ? getBoxColor(i) : 'transparent';
      const isTopBox = i === maxStreak - 1;
      const boxClasses = `box ${isTopBox ? 'filled' : ''}`;
      boxes.push(
        <Box
          key={i}
          className={boxClasses}
          style={{ backgroundColor: color }}
        />
      );
    }
    
    return boxes;
  };
  

  const handleQuitClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
    setShowQuitMessage(true);
  };

  const handleYesClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
    setGameOver(true);
    setShowQuitMessage(false);
  };

  const handleNoClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
    setShowQuitMessage(false);
  };

  return (
    <Box className="multiplier-bar">
      <Box className="quit-box">
        {!showQuitMessage && (
          <button onClick={handleQuitClick}>
            Quit
          </button>
        )}
        {showQuitMessage && (
          <Box className="quit-message">
            <Typography style={{marginBottom: '10px'}}>Are you sure you want to quit?</Typography>
            <Box className="quit-button-container">
              <button onClick={handleYesClick} style={{marginRight: '5px'}}>Yes</button>
              <button onClick={handleNoClick} style={{marginLeft: '5px'}}>No</button>
            </Box>
          </Box>
        )}
      </Box>
      {displayScore && (
        <Box className="score-container">
          <Box className="box-container">{renderBoxes()}</Box>
          <Typography>Multiplier:</Typography>
          <Typography style={{ fontSize: '30px' }}>{multiplier}x</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MultiplierBar;
