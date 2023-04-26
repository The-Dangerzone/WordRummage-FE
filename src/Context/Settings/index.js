import React, { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [score, setScore] = useState(0);





    const values = {
        isLoggedIn, setIsLoggedIn,
        score, setScore,
    }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
