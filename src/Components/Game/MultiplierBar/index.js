import { useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css';
import { Box, Typography } from '@mui/material';

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
      boxes.push(
        <Box
          key={i}
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: color,
            marginBottom: '10px',
            border: '1px solid black',
          }}
        />
      );
    }
    return boxes;
  };

  return (
    <Box sx={{ width: '100px', height: '450px', justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      {displayScore && (
        <Box sx={{ width: '100px', height: '450px', border: '1px solid black', justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Typography sx={{ paddingBottom: '10px' }}>Multiplier Bar</Typography>
          <Box sx={{ width: '50px', height: '360px', display: "flex", flexDirection: "column-reverse" }}>{renderBoxes()}</Box>
          <Typography>Streak: {streak}</Typography>
          <Typography>Multi: {multiplier}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MultiplierBar;
