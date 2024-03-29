import React, { useState } from 'react';
import axios from 'axios';


export const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const [validUser, setValidUser] = useState({});
  const [displayNamePopup, setDisplayNamePopup] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [insaneLeaderboard, setInsaneLeaderboard] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const updateUser = async (data) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/stats/${validUser._id}`;
      // check response of server for success
      // send other code if displayName already exists
      // prompt user to choose another name
      let updatedUser = await axios.put(url, data);
      setValidUser(updatedUser.data);

    } catch (error) {
      console.log(error.message);
    }

  }

  const values = {
    validUser, setValidUser,
    displayNamePopup, setDisplayNamePopup,
    updateUser,
    leaderboard, setLeaderboard,
    insaneLeaderboard, setInsaneLeaderboard,
    isLoggedIn, setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider;