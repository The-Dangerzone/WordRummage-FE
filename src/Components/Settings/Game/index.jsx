import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Slider, Box, Typography, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css'
import Rain from '../../Rain';
import InfoOutlined from '@mui/icons-material/InfoOutlined';



const GameSettings = () => {

  const { setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer, setDisplayScore, displayScore, allowBoardGrowth, setAllowBoardGrowth, resetGame } = useContext(SettingsContext);

  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(null);
  
  useEffect(() => {
    resetGame();
  }, []);

  const handleContainerClick = (index) => {
    if (selectedContainerIndex === index) {
      // Clicked on the already selected container, deselect it
      setSelectedContainer(null);
      setSelectedContainerIndex(null);
    } else {
      // Clicked on a different container, update the selection
      setSelectedContainer(index);
      setSelectedContainerIndex(index);
    }
  };

  return (
    <div className='game-settings-container'>

      <div className='game-settings-rain-container'>
        <Rain />
      </div>

      <div className='settings-content'>
        <div className={`mode-container ${selectedContainer === 0 ? 'selected' : ''}`}
          onClick={() => handleContainerClick(0)}>
          <h1>Custom Mode</h1>
          <FormGroup style={{ userSelect: 'none' }}>
            <div>
              <FormControlLabel
                control={
                  <Switch

                    checked={displayRoundTimer}
                    onChange={(e) => setDisplayRoundTimer(e.target.checked)}
                  />}
                label="Round Timer"
              />
              <Tooltip title="If enabled, the circular progress will be present. If the circle completes the round is over.">
                <InfoOutlined fontSize='small' />
              </Tooltip>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={displayTimer}
                    onChange={(e) => setDisplayTimer(e.target.checked)}
                  />}
                label="Game Over Timer"
              />
              <Tooltip title="If enabled, a timer will be present and the game will end when the timer reaches 0.">
                <InfoOutlined fontSize='small' />
              </Tooltip>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={displayScore}
                    onChange={(e) => setDisplayScore(e.target.checked)}
                  />}
                label="Score"
              />
              <Tooltip title="If enabled, the game will keep a score and will have a score multiplier">
                <InfoOutlined fontSize='small' />
              </Tooltip>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={allowBoardGrowth}
                    onChange={(e) => setAllowBoardGrowth(e.target.checked)}
                  />}
                label="Growing Board" />
              <Tooltip title="If enabled, the board will grow by 1 row and 1 column every 5 rounds.">
                <InfoOutlined fontSize='small' />
              </Tooltip>
            </div>

            <Box sx={{ width: 300, margin: 1 }}>
              <div style={{ display: 'flex', width: '225px', justifyContent: 'space-between', }}>
                <Typography id="discrete-slider" gutterBottom>
                  Starting Board Size (6-20)
                </Typography>
                <Tooltip title="The starting size of the board. This number will represent the number of letters per column and row" sx={{ marginTop: '-3px', marginLeft: '-5px' }}>
                  <InfoOutlined fontSize='small' />
                </Tooltip>
              </div>
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
          </FormGroup>

        </div>
        <div className={`mode-container ${selectedContainer === 1 ? 'selected' : ''}`}
          onClick={() => handleContainerClick(1)}>
          <h1>Standard Mode</h1>
        </div>

        <div className={`mode-container ${selectedContainer === 2 ? 'selected' : ''}`}
          onClick={() => handleContainerClick(2)}>
          <h1>Insane Mode</h1>
        </div>
      </div>

      <div className='button-container'>
        <Link to="/">
          <button>Back</button>
        </Link>

        <Link to="/game">
          <button>Start Game</button>
        </Link>
      </div>
    </div>
  );
}

export default GameSettings;