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
    for (let i = 0; i < boardSize * boardSize; i++) {
      const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      board.push(randLetter);
    }
    setLetters(board);
  }

  function renderBoard() {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const blocks = [];
      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;
        const blockId = `block-${index}`;
        blocks.push(
          <div key={blockId} id={blockId} className="letter-block">
            {letters[index]}
          </div>
        );
      }
      const rowId = `row-${i + 1}`;
      rows.push(
        <div key={rowId} id={rowId} className="letter-row">
          {blocks}
        </div>
      );
    }
    return rows;
  }

  return (
    <>
      <div className="target-word">Target Word: {answer.join('')}</div>
      <div className="game-container">{renderBoard()}</div>;
    </>
  );
}


export default BoardWindow;