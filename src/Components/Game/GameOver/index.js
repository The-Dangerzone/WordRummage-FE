import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import EventTracker from '../EventTracker';
import { Link } from 'react-router-dom';

const GameOver = () => {
  const { score, round, incorrectLetters, maxStreak } = useContext(SettingsContext);
  const [showEventLog, setShowEventLog] = useState(false);

  const handleReviewButtonClick = () => {
    setShowEventLog(!showEventLog);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h1>Game Over</h1>
        <h2>Score: {score}</h2>
        <h2>Round: {round}</h2>
        <h2>Incorrect Letters: {incorrectLetters}</h2>
        <h2>Biggest Streak: {maxStreak}</h2>
        <Link to="/">
          <button>Return to Title Screen</button>
        </Link>
        <button style={{margin: '10px'}} onClick={handleReviewButtonClick}>
          {showEventLog ? 'Hide Event Log' : 'Review Game'}
        </button>
      </div>
      <div style={{ marginLeft: '20px', width: showEventLog ? '500px' : '0', overflow: 'hidden', transition: 'width 0.5s' }}>
        {showEventLog && <EventTracker />}
      </div>
    </div>
  );
};

export default GameOver;
