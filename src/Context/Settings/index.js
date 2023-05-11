import React, { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [boardSize, setBoardSize] = useState(6);
  const [gameTimer, setGameTimer] = useState(60);
  const [roundTimer, setRoundTimer] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(true);
  const [displayRoundTimer, setDisplayRoundTimer] = useState(true);
  const [displayScore, setDisplayScore] = useState(true);
  const [allowBoardGrowth, setAllowBoardGrowth] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function resetGame() {
    setScore(0);
    setRound(1);
    setGameTimer(60);
    setBoardSize(6);
    setRoundTimer(0);
    setResetTimer(true);
    setDisplayTimer(true);
    setDisplayRoundTimer(true);
    setDisplayScore(true);
    setAllowBoardGrowth(true);
    setAnswer([]);
    setCorrectLetters([]);
    setGameOver(false);
    setIncorrectLetters(0);
  }

  const values = {
    resetGame,
    isLoggedIn, setIsLoggedIn,
    score, setScore,
    round, setRound,
    boardSize, setBoardSize,
    gameTimer, setGameTimer,
    roundTimer, setRoundTimer,
    resetTimer, setResetTimer,
    displayTimer, setDisplayTimer,
    displayRoundTimer, setDisplayRoundTimer,
    displayScore, setDisplayScore,
    allowBoardGrowth, setAllowBoardGrowth,
    answer, setAnswer,
    correctLetters, setCorrectLetters,
    gameOver, setGameOver,
    incorrectLetters, setIncorrectLetters
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
