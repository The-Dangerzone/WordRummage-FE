import React, { useState } from 'react';


export const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const [validUser, setValidUser] = useState({});
  const [displayNamePopup, setDisplayNamePopup] = useState(false);


  const values = {
    validUser, setValidUser,
    displayNamePopup, setDisplayNamePopup,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider;