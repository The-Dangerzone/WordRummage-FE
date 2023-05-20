import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, Slider, Box, Typography, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import InfoIcon from '@mui/icons-material/Info';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';


const GameSettings = () => {

  const { setBoardSize, displayTimer, displayRoundTimer, setDisplayTimer, setDisplayRoundTimer, setDisplayScore, displayScore, allowBoardGrowth, setAllowBoardGrowth, resetGame } = useContext(SettingsContext);

  const [fallingLetters, setFallingLetters] = useState([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const generateFallingLetters = () => {
      const letters = [];
      for (let i = 0; i < 100; i++) {
        const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const delay = Math.random() * 5;
        const position = Math.random() * 100;
        const speed = Math.random() * 10 + 1;
        const fallingLetter = { letter, delay, position, speed };
        if (!checkCollision(letters, fallingLetter)) {
          letters.push(fallingLetter);
        }
      }
      setFallingLetters(letters);
    };

    const checkCollision = (existingLetters, newLetter) => {
      const collisionThreshold = 1.5; // Adjust this value to define the minimum distance between letters

      for (const letter of existingLetters) {
        const distance = Math.abs(letter.position - newLetter.position);
        if (distance < collisionThreshold) {
          return true;
        }
      }

      return false;
    };

    generateFallingLetters();
    resetGame();

  }, []);

  return (
    <div className='game-settings-container'>
      <div className="falling-letters-container">
        {fallingLetters.map((fallingLetter, index) => (
          <span
            key={index}
            className="falling-letter"
            style={{
              animationDelay: `${fallingLetter.delay}s`,
              left: `${fallingLetter.position}%`,
              animationDuration: `${10 / fallingLetter.speed}s`,
            }}
          >
            {fallingLetter.letter}
          </span>
        ))}
      </div>
      <Box className='game-settings-content'>
        <h1>Game Settings</h1>
        <FormGroup sx={{ marginLeft: 10 }} style={{ userSelect: 'none' }}>
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
        <Box sx={{ width: 500, margin: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/">
            <button>Back</button>
          </Link>

          <Link to="/game">
            <button>Start Game</button>
          </Link>
        </Box>
      </Box>

    </div>
  );
}

export default GameSettings;