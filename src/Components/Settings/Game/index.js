import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Slider, Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../../Context/Settings';

const GameSettings = () => {

  const { boardSize, setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer, setDisplayScore, displayScore, allowBoardGrowth, setAllowBoardGrowth, resetGame } = useContext(SettingsContext);

  
  useEffect(() => {
    resetGame();
  }, []);

  return (
    <>
      <h1>Game Settings</h1>
      <Box sx={{ width: 300, margin: 3 }}>
        <FormGroup>

          <FormControlLabel
            control={
              <Switch
                checked={displayRoundTimer}
                onChange={(e) => setDisplayRoundTimer(e.target.checked)}
              />}
            label="Round Timer"
          />

          <FormControlLabel
            control={
              <Switch
                checked={displayTimer}
                onChange={(e) => setDisplayTimer(e.target.checked)}
              />}
            label="Game Over Timer"
          />

          <FormControlLabel
            control={
              <Switch
                checked={displayScore}
                onChange={(e) => setDisplayScore(e.target.checked)}
              />}
            label="Score"
          />

          <FormControlLabel
            control={
              <Switch
                checked={allowBoardGrowth}
                onChange={(e) => setAllowBoardGrowth(e.target.checked)}
              />}
            label="Growing Board" />

          <FormControlLabel control={<Switch defaultChecked />} label="Items" />
          <FormControlLabel control={<Switch defaultChecked />} label="Test" />

        </FormGroup>
        <Box sx={{ width: 300, margin: 1 }}>
          <Typography id="discrete-slider" gutterBottom>
            Starting Board Size (6-20)
          </Typography>
          <Slider
            defaultValue={6}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={6}
            max={20}
            onChange={(e, value) => setBoardSize(value)}
          />
        </Box>
      </Box>


      <Link to="/"><button>Back</button></Link>
      <Link to="/game"><button>Start Game</button></Link>

    </>
  );
}

export default GameSettings;