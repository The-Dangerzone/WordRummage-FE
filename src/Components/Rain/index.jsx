import { useState, useEffect } from "react";
import "./styles.css";

function Rain () {
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
      const collisionThreshold = 1.5; 

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

  return(
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
  )
}

export default Rain;