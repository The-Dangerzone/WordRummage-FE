import React, { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [score, setScore] = useState(0);
    const [boardSize, setBoardSize] = useState(6);
    const [gameTimer, setGameTimer] = useState(60);
    const [roundTimer, setRoundTimer] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);



    const values = {
        isLoggedIn, setIsLoggedIn,
        score, setScore,
        boardSize, setBoardSize,
        gameTimer, setGameTimer,
        roundTimer, setRoundTimer,
        resetTimer, setResetTimer,
    }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
