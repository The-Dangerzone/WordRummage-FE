import React, { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [score, setScore] = useState(0);
    const [boardSize, setBoardSize] = useState(6);





    const values = {
        isLoggedIn, setIsLoggedIn,
        score, setScore,
        boardSize, setBoardSize,
    }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
