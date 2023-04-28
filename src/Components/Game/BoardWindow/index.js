import React, { useState, useEffect } from 'react';
import './styles.css';
import wordArray from './wordList';

// boardSize as prop
function BoardWindow() {
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    wordBreak();
    fillBoard();
  }, []);

  // temp
  const boardSize = 30;
  
  function wordBreak() {
    let randAnswer = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    setAnswer(randAnswer.split('')); 
  }


  function fillBoard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        row.push(randLetter);
      }
      board.push(row);
    }
    setLetters(board);
  }

  function renderBoard() {
  return letters.map((row, i) => (
    <div key={`row-${i}`} className="letter-row">
      {row.map((letter, j) => (
        <div key={`block-${i}-${j}`} id={`block-${i}-${j}`} className="letter-block">
          {letter}
        </div>
      ))}
    </div>
  ));
}

  return (
    <>
      <div className="target-word">Target Word: {answer.join('')}</div>
      <div className="game-container">{renderBoard()}</div>;
    </>
  );
}


export default BoardWindow;