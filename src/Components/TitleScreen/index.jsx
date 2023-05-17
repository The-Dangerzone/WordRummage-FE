import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Link } from "react-router-dom";
import "./styles.css";

const TitleScreen = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(SettingsContext);
  const [fallingLetters, setFallingLetters] = useState([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const generateFallingLetters = () => {
      const letters = [];
      for (let i = 0; i < 100; i++) {
        const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const delay = Math.random() * 5;
        const position = Math.random() * 100;
        const speed = Math.random() * 10 + 1;
        const fallingLetter = { letter, delay, position, speed };
        if (!checkCollision(letters, fallingLetter)) {
          letters.push(fallingLetter);
        }
      }
      setFallingLetters(letters);
    };

    const checkCollision = (existingLetters, newLetter) => {
      const collisionThreshold = 1.5; // Adjust this value to define the minimum distance between letters

      for (const letter of existingLetters) {
        const distance = Math.abs(letter.position - newLetter.position);
        if (distance < collisionThreshold) {
          return true;
        }
      }

      return false;
    };

    generateFallingLetters();
  }, []);

  const handleSinglePlayer = () => {
    // Placeholder in case we need it
  };

  const handleSettings = () => {
    // Placeholder in case we need it
  };

  const handleHowToPlay = () => {
    // Placeholder in case we need it
  };

  const handleLeaderBoard = () => {
    // Placeholder in case we need it
  };

  const handleMultiplayer = () => {
    // Placeholder in case we need it
  };

  return (
    <div className="title-screen-container">
      <div className="falling-letters-container">
        {fallingLetters.map((fallingLetter, index) => (
          <span
            key={index}
            className="falling-letter"
            style={{
              animationDelay: `${fallingLetter.delay}s`,
              left: `${fallingLetter.position}%`,
              animationDuration: `${10 / fallingLetter.speed}s`,
            }}
          >
            {fallingLetter.letter}
          </span>
        ))}
      </div>
      <div className="title-screen-content">
        <h1>Word Rummage</h1>
        <div className="button-group">
          <Link to="/gamesettings">
            <button onClick={handleSinglePlayer}>Single Player</button>
          </Link>
          <Link to="/multiplayeroptions">
            <button onClick={handleMultiplayer}>Multiplayer</button>
          </Link>
        </div>
        <div className="button-group">
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
      </div>
    </div>
  );
};

export default TitleScreen;
