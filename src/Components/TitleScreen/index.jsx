import { useContext } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Link } from "react-router-dom";

const TitleScreen = (props) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(SettingsContext);

  const handleSinglePlayer = () => {

    // Place Holder incase we need it

  }

  const handleSettings = () => {

    // Place Holder incase we need it

  }

  const handleHowToPlay = () => {

    // Place Holder incase we need it


  }

  const handleLeaderBoard = () => {

    // Place Holder incase we need it

  }

  const handleMultiplayer = () => {

    // Place Holder incase we need it

  }


  return (
    <>
      <div>
        <h1>Word Rummage</h1>
        <Link to="/gamesettings">
          <button onClick={handleSinglePlayer}>Single Player</button>
        </Link>
        <Link to="/multiplayeroptions">
          <button onClick={handleMultiplayer}>Multiplayer</button>
        </Link>
        <Link to="/settings">
          <button onClick={handleSettings}>Settings</button>
        </Link>
        <Link to="/instructions">
          <button onClick={handleHowToPlay}>How to Play</button>
        </Link>
        <Link to="/leaderboard">
          <button onClick={handleLeaderBoard}>Leaderboard</button>
        </Link>
      </div>
    </>
  );
}

export default TitleScreen;