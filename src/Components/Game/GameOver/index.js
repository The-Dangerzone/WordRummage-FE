import React, { useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import EventTracker from '../EventTracker';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const GameOver = () => {
  const { score, round, incorrectLetters, streak, maxStreak } = useContext(SettingsContext);

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
      </div>
      <div style={{ marginLeft: '20px' }}>
        <EventTracker />
      </div>
    </div>
  );
};

export default GameOver;
