import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

const GameSettings = () => {
  return (
    <>
      <p>GameSettings Screen</p>
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Score Multiplier" />
        <FormControlLabel control={<Switch defaultChecked />} label="Round Timer" />
        <FormControlLabel control={<Switch defaultChecked />} label="Growing Board" />
        <FormControlLabel control={<Switch defaultChecked />} label="Items" />
        <FormControlLabel control={<Switch defaultChecked />} label="Test" />
      </FormGroup>


      <Link to="/"><button>Back</button></Link>
      <Link to="/game"><button>Start Game</button></Link>

    </>
  );
}

export default GameSettings;