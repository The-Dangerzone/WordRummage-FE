import React, { useState } from 'react';


export const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const [validUser, setValidUser] = useState({});


  const values = {
    validUser, setValidUser,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider;