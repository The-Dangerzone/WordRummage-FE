import { useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Box, Typography } from '@mui/material';
import './styles.css';

const MultiplierBar = () => {
  const { streak, multiplier, displayScore } = useContext(SettingsContext);

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
    for (let i = 0; i < 6; i++) {
      const color = i < streak ? getBoxColor(i) : 'transparent';
      const isTopBox = i === streak - 1;
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

  return (
    <Box className="multiplier-bar">
      {displayScore && (
        <Box className="score-container">
          <Box className="box-container">{renderBoxes()}</Box>
          {/* <Typography>Streak: {streak}</Typography> */}
          <Typography>Multiplier:</Typography>
          <Typography style={{fontSize: '30px'}}>{multiplier}x</Typography>
                   

        </Box>
      )}
    </Box>
  );
};

export default MultiplierBar;