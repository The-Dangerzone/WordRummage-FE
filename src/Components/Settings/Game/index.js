import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Slider, Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';

const GameSettings = () => {

  const { boardSize, setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer } = useContext(SettingsContext);

  return (
    <>
      <p>GameSettings Screen</p>
      <FormGroup>
        <FormControlLabel control={
          <Switch
            checked={displayRoundTimer}
            onChange={(e) => setDisplayRoundTimer(e.target.checked)}
          />}
          label="Round Timer"
        />
        <FormControlLabel control={
          <Switch
            checked={displayTimer}
            onChange={(e) => setDisplayTimer(e.target.checked)}
          />}
          label="Game Over Timer"
        />
        <FormControlLabel control={<Switch defaultChecked />} label="Score Multiplier" />
        <FormControlLabel control={<Switch defaultChecked />} label="Growing Board" />
        <FormControlLabel control={<Switch defaultChecked />} label="Items" />
        <FormControlLabel control={<Switch defaultChecked />} label="Test" />

      </FormGroup>
      <Box sx={{ width: 300 }}>
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


      <Link to="/"><button>Back</button></Link>
      <Link to="/game"><button>Start Game</button></Link>

    </>
  );
}

export default GameSettings;