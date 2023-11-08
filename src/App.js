import Leaderboard from './Components/Leaderboard';
import AppSettings from './Components/Settings/Application';
import GameSettings from './Components/Settings/Game';
import TitleScreen from './Components/TitleScreen';
import MultiplayerOptions from './Components/Settings/MultiplayerOptions';
import Instructions from './Components/Instructions';
import GameScreen from './Components/Game/GameScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/User';
import DisplayName from './Components/Auth/DisplayName';
import UserProfile from './Components/UserProfile';

function App() {
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const { validUser, setValidUser } = useContext(UserContext);
  const { displayNamePopup, setDisplayNamePopup, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
          console.log(user);
          postUser();
      }
  }, [isAuthenticated])

  // useEffect(() => {
  //   if(!validUser.displayName){
  //     setDisplayNamePopup(true);
  //   }
  // }, [validUser])

  const displayNameCheck = () => {
    setDisplayNamePopup(true);
  }
  

  const postUser = async () => {
    if (isAuthenticated) {
      const res = await getIdTokenClaims();
      const jwt = res.__raw;
      
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: "post",
        baseURL: process.env.REACT_APP_SERVER,
        url: '/user',
  
      }
      try {

        let userFromDB = await axios(config);
        setValidUser(userFromDB.data);
        console.log(userFromDB.data);
        if(!userFromDB.data.displayName){
          displayNameCheck();
        }
        setIsLoggedIn(true);

      } catch (error) {
        console.log(error.message);
      }
    }
  }



  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        {displayNamePopup && (
          <DisplayName />
        )}
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="/gamesettings" element={<GameSettings />} />
          <Route path="/multiplayeroptions" element={<MultiplayerOptions />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;