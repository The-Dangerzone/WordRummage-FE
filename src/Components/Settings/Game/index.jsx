import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Box, Typography, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css'
import Rain from '../../Rain';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import BoardSizeSlider from './slider';



const GameSettings = () => {

  const { setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer, setDisplayScore, displayScore, allowBoardGrowth, setAllowBoardGrowth, resetGame } = useContext(SettingsContext);

  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    resetGame();
  }, []);


  const handleContainerClick = (index) => {
    if (index === 0) {
      setSelectedContainer(0);
      setSelectedMode(0);

    }
    if (index === 1) {
      setSelectedContainer(1);
      setSelectedMode(1);
      setDisplayTimer(true);
      setDisplayRoundTimer(true);
      setDisplayScore(true);
      setAllowBoardGrowth(true);
      setBoardSize(6);
    }
    if (index === 2) {
      setSelectedContainer(2);
      setSelectedMode(2);
      setDisplayTimer(true);
      setDisplayRoundTimer(false);
      setDisplayScore(true);
      setAllowBoardGrowth(true);
      setBoardSize(8);
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
                disabled={selectedMode !== 0}
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
                disabled={selectedMode !== 0}

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
                disabled={selectedMode !== 0}

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
                disabled={selectedMode !== 0}

                label="Growing Board" />
              <Tooltip title="If enabled, the board will grow by 1 row and 1 column every 5 rounds.">
                <InfoOutlined fontSize='small' />
              </Tooltip>
            </div>

            <Box sx={{ width: 300, margin: 1 }}>
              <div style={{ display: 'flex', width: '225px', justifyContent: 'space-between', }}>
                <Typography id="discrete-slider" gutterBottom className={selectedMode !== 0 ? "disabled-typography" : ""}
                >
                  Starting Board Size (6-20)
                </Typography>
                <Tooltip title="The starting size of the board. This number will represent the number of letters per column and row" sx={{ marginTop: '-3px', marginLeft: '-5px' }}>
                  <InfoOutlined fontSize='small' />
                </Tooltip>
              </div>
              <BoardSizeSlider />
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
          <button
            disabled={selectedContainer === null}
            className={`${selectedContainer === null ? 'disabled-button' : ''}`}
            title={selectedContainer === null ? 'Select a mode to start a game' : ''}>
            Start Game
          </button>

        </Link>
      </div>
    </div>
  );
}

export default GameSettings;