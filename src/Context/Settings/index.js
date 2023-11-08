import React, { useState } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

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
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [maxStreak, setMaxStreak] = useState(0);
  const [eventLog, setEventLog] = useState([]);
  const [insaneAlphabet, setInsaneAlphabet] = useState(false);
  const [selectedMode, setSelectedMode] = useState(1);
  const [currentBoardSize, setCurrentBoardSize] = useState(6);
  const [countDownFlag, setCountDownFlag] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [effectVolume, setEffectVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [customWordFlag, setCustomWordFlag] =useState(false);
  const [customWordArray, setCustomWordArray] = useState([]);
  const [inGame, setInGame] = useState(false);



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
    setStreak(0);
    setMultiplier(1);
    setMaxStreak(0);
    setEventLog ([]);
    setInsaneAlphabet(false);
    setCurrentBoardSize(6);
    setPlayMusic(false);
  }

  const values = {
    resetGame,
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
    incorrectLetters, setIncorrectLetters,
    streak, setStreak,
    multiplier, setMultiplier,
    maxStreak, setMaxStreak,
    eventLog, setEventLog,
    insaneAlphabet, setInsaneAlphabet,
    selectedMode, setSelectedMode,
    currentBoardSize, setCurrentBoardSize,
    countDownFlag, setCountDownFlag,
    playMusic, setPlayMusic,
    effectVolume, setEffectVolume,
    musicVolume, setMusicVolume,
    customWordArray, setCustomWordArray,
    customWordFlag, setCustomWordFlag,
    inGame, setInGame,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
