import { SettingsContext } from '../../../Context/Settings';
import { useContext, useEffect, useState } from 'react';
import './styles.css';
import { CircularProgress, Typography, Box } from '@mui/material';


const TimerBar = () => {
  const { boardSize, resetTimer, displayRoundTimer, displayTimer, roundTimer, setRoundTimer, gameTimer,setGameTimer, } = useContext(SettingsContext);
  // const [progress, setProgress] = useState(0);
  // const [gameTimer, setGameTimer] = useState(60);


  useEffect(() => {
    const roundTimerInterval = setInterval(() => {
      setRoundTimer((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + boardSize));
    }, 1000);
    return () => {
      clearInterval(roundTimerInterval);
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
      setRoundTimer(0);
    }
  }, [resetTimer]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>
      {(displayRoundTimer || displayTimer) && (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '10px' }}>
          {displayRoundTimer && (
            <CircularProgress size={80} variant="determinate" value={roundTimer} />
          )}
          {displayTimer && (
            <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', userSelect: 'none' }} variant="caption" fontSize={30}>{gameTimer}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
  
}

export default TimerBar;