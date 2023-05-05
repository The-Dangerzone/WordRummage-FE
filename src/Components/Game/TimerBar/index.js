import { SettingsContext } from '../../../Context/Settings';
import { useContext, useEffect, useState } from 'react';
import './styles.css';
import { CircularProgress, Typography, Box } from '@mui/material';


const TimerBar = () => {
  const { boardSize, resetTimer } = useContext(SettingsContext);
  const [progress, setProgress] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);


  useEffect(() => {
    const roundTimer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + boardSize));
    }, 1000);
    return () => {
      clearInterval(roundTimer);
    };
  }, []);

  useEffect(() => {
    const advanceGameTimer = setInterval(() => {
      setGameTimer((prevGameTimer) => (prevGameTimer > 0 ? prevGameTimer - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(advanceGameTimer);
    };
  }, []);


  useEffect(() => {
    if (resetTimer) {
      setProgress(0);
    }
  }, [resetTimer]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <Typography variant="caption" marginRight={2} fontSize={20}>Next Round Timer: </Typography>
        <CircularProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <Typography variant="caption" marginRight={2} fontSize={20}>Game Timer: {gameTimer}</Typography>
      </Box>
    </Box>
  );
}

export default TimerBar;