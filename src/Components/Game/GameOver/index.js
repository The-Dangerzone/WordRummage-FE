import React, { useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Link } from 'react-router-dom';


const GameOver = () => {
    
const { score, round } = useContext(SettingsContext);
  

  
  return (
        <div>
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
            <h2>Round: {round}</h2>
            <Link to="/"><button>Return to Title Screen</button></Link>
        </div>
    );
};

export default GameOver;