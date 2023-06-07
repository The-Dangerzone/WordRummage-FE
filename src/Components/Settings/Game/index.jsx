import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Box, Typography, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css';
import Rain from '../../Rain';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import BoardSizeSlider from './slider';
import click from "../../../assets/audio/button_click.mp3";

const clickAudio = new Audio(click);

const GameSettings = () => {
  const { setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer, setDisplayScore, displayScore, allowBoardGrowth, setAllowBoardGrowth, resetGame, insaneAlphabet, setInsaneAlphabet, setSelectedMode, selectedMode, setCountDownFlag, setPlayMusic, effectVolume } = useContext(SettingsContext);

  useEffect(() => {
    resetGame();
  }, []);

  const handleTabClick = (index) => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
    setSelectedMode(index);
    if (index === 1) {
      setDisplayTimer(true);
      setDisplayRoundTimer(true);
      setDisplayScore(true);
      setAllowBoardGrowth(true);
      setBoardSize(6);
      setInsaneAlphabet(false);
    }
    if (index === 2) {
      setDisplayTimer(true);
      setDisplayRoundTimer(false);
      setDisplayScore(true);
      setAllowBoardGrowth(true);
      setBoardSize(8);
      setInsaneAlphabet(true);
    }
  };

  const handleStartClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
    setCountDownFlag(true);
    setPlayMusic(true);
  };

  const handleBackClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.volume = effectVolume / 100;
    clickAudio.play()
  };

  return (
    <div className='game-settings-container'>
      <div className='game-settings-rain-container'>
        <Rain />
      </div>
      <div className='game-settings-title'>
        <h1>Select a Game Mode</h1>
      </div>
      <div className='settings-tabs'>
        <h1
          className={`mode-tab ${selectedMode === 0 ? 'selected' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          Custom
        </h1>
        <h1
          className={`mode-tab ${selectedMode === 1 ? 'selected' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Standard
        </h1>
        <h1
          className={`mode-tab ${selectedMode === 2 ? 'selected' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Insane
        </h1>
      </div>
      <div className='settings-content'>
        <div className={`mode-info ${selectedMode === 0 ? 'active' : ''}`}>
        <div>Custom Game Settings</div>
          <FormGroup style={{ userSelect: 'none' }}>
            <div>
              <FormControlLabel
                control={
                  <Switch

                    checked={displayRoundTimer}
                    onChange={(e) => setDisplayRoundTimer(e.target.checked)}
                  />}
                disabled={selectedMode !== 0}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '160px' }}>
                    {displayRoundTimer ? 'Round Timer: ON' : 'Round Timer: OFF'}
                    <Tooltip title="If enabled, the circular progress will be present. If the circle completes the round is over.">
                      <InfoOutlined fontSize='small' style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={displayTimer}
                    onChange={(e) => setDisplayTimer(e.target.checked)}
                  />}
                disabled={selectedMode !== 0}

                label={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                    {displayTimer ? 'Game Over Timer: ON' : 'Game Over Timer: OFF'}
                    <Tooltip title="If enabled, a timer will be present and the game will end when the timer reaches 0.">
                      <InfoOutlined fontSize='small' style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }

              />

            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={displayScore}
                    onChange={(e) => setDisplayScore(e.target.checked)}
                  />}
                disabled={selectedMode !== 0}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '125px' }}>
                    {displayScore ? 'Scoring: ON' : 'Scoring: OFF'}
                    <Tooltip title="If enabled, the game will keep a score and will have a score multiplier">
                      <InfoOutlined fontSize='small' style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={allowBoardGrowth}
                    onChange={(e) => setAllowBoardGrowth(e.target.checked)}
                  />}
                disabled={selectedMode !== 0}

                label={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '180px' }}>
                    {allowBoardGrowth ? 'Growing Board: ON' : 'Growing Board: OFF'}
                    <Tooltip title="If enabled, the board will grow by 1 row and 1 column every 5 rounds.">
                      <InfoOutlined fontSize='small' style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }
              />
            </div>

            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={insaneAlphabet}
                    onChange={(e) => setInsaneAlphabet(e.target.checked)}
                  />}
                disabled={selectedMode !== 0}

                label={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '160px' }}>
                    {insaneAlphabet ? 'Alphabet: Insane' : 'Alphabet: Regular'}
                    <Tooltip title="If enabled, the board will only use letters from the current target word">
                      <InfoOutlined fontSize='small' style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }
              />
            </div>

            <Box sx={{ width: 300, margin: 1 }}>
              <div style={{ display: 'flex', width: '225px', justifyContent: 'space-between', }}>
                <Typography id="discrete-slider" gutterBottom className={selectedMode !== 0 ? "disabled-typography" : ""}
                >
                  Starting Board Size (6-20)
                </Typography>
                <Tooltip title="The starting size of the board. This number will represent the number of letters per column and row">
                  <InfoOutlined fontSize='small' />
                </Tooltip>
              </div>
              <BoardSizeSlider />
            </Box>
          </FormGroup>
        </div>
        <div className={`mode-info ${selectedMode === 1 ? 'active' : ''}`}>
          <div>Standard Game Settings</div>
          <div>Round Timer: ON</div>
          <div>Game Over Timer: ON</div>
          <div>Scoring: ON</div>
          <div>Growing Board: ON</div>
          <div>Alphabet: Regular</div>
          <div>Starting Board Size: 6</div>
        </div>
        <div className={`mode-info ${selectedMode === 2 ? 'active' : ''}`}>
          <div>Insane Game Settings</div>
          <div>Round Timer: OFF</div>
          <div>Game Over Timer: ON</div>
          <div>Scoring: ON</div>
          <div>Growing Board: ON</div>
          <div>Alphabet: Insane</div>
          <div>Starting Board Size: 8</div>

        </div>
      </div>
      <div className='button-container'>
        <Link to='/'>
          <button onClick={handleBackClick}>Back</button>
        </Link>
        <Link to='/game'>
          <button onClick={handleStartClick} disabled={selectedMode === null}>
            Start
          </button>
        </Link>


      </div>
    </div>
  );
};

export default GameSettings;
