import React, { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);





    const values = {
        isLoggedIn,
        setIsLoggedIn,
    }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;
