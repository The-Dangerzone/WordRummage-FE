import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import EventTracker from '../EventTracker';
import { Link } from 'react-router-dom';
import Rain from '../../Rain';
import './styles.css';


const GameOver = () => {
  const { score, round, incorrectLetters, maxStreak } = useContext(SettingsContext);
  const [showEventLog, setShowEventLog] = useState(false);

  const handleReviewButtonClick = () => {
    setShowEventLog(!showEventLog);
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
        <Link to="/">
          <button>Return to Title Screen</button>
        </Link>
        <button style={{ margin: '10px' }} onClick={handleReviewButtonClick}>
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