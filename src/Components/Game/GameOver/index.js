import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import EventTracker from '../EventTracker';
import { Link } from 'react-router-dom';
import Rain from '../../Rain';
import './styles.css';
import click from "../../../assets/audio/button_click.mp3";

const clickAudio = new Audio(click);


const GameOver = () => {
  const { score, round, incorrectLetters, maxStreak, setScore, setRound, setGameTimer,setBoardSize, currentBoardSize, setRoundTimer, setResetTimer, setDisplayTimer, displayTimer, setDisplayRoundTimer, displayRoundTimer, setDisplayScore, displayScore, setAllowBoardGrowth, allowBoardGrowth, setAnswer, setCorrectLetters, setGameOver, setIncorrectLetters, setStreak, setMultiplier, setMaxStreak, setEventLog, setInsaneAlphabet, insaneAlphabet, setCountDownFlag } = useContext(SettingsContext);
  const [showEventLog, setShowEventLog] = useState(false);

  const handleReviewButtonClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.play()
    setShowEventLog(!showEventLog);
  };

  const handleHomeClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.play()
  };
  
  const handleReplayClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.play()
    setScore(0);
    setRound(1);
    setGameTimer(60);
    setBoardSize(currentBoardSize);
    setRoundTimer(0);
    setResetTimer(true);
    setDisplayTimer(displayTimer);
    setDisplayRoundTimer(displayRoundTimer);
    setDisplayScore(displayScore);
    setAllowBoardGrowth(allowBoardGrowth);
    setAnswer([]);
    setCorrectLetters([]);
    setGameOver(false);
    setIncorrectLetters(0);
    setStreak(0);
    setMultiplier(1);
    setMaxStreak(0);
    setEventLog ([]);
    setInsaneAlphabet(insaneAlphabet);
    setCountDownFlag(true);
    
  };

  return (
    <div className="game-over-container">
      <div className='rain-container'>
      <Rain />  
      </div>
      <div className="game-over-content">
        <h1>Game Over</h1>
        <h2>Score: {score}</h2>
        <h2>Round: {round}</h2>
        <h2>Incorrect Letters: {incorrectLetters}</h2>
        <h2>Biggest Streak: {maxStreak}</h2>
        <Link to="/game">
          <button style={{ margin: '5px' }} onClick={handleReplayClick}>Try Again</button>
        </Link>
        <Link to="/">
          <button style={{ margin: '5px' }} onClick={handleHomeClick}>Return to Title Screen</button>
        </Link>
        <button style={{ margin: '5px' }} onClick={handleReviewButtonClick}>
          {showEventLog ? 'Hide Event Log' : 'Review Game'}
        </button>
      </div>
      <div className="event-log-container" style={{ width: showEventLog ? '500px' : '0' }}>
        {showEventLog && <EventTracker />}
      </div>
    </div>
  );
};

export default GameOver;