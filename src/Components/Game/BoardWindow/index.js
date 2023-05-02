import React, { useState, useEffect } from 'react';
import './styles.css';
import wordArray from './wordList';

// boardSize as prop
function BoardWindow() {
  console.log('Test BoardWindow ----------')
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);
  let correctLetters = [];
  // let answer = [];

  useEffect(() => {
    wordBreak();
    // fillBoard();
    console.log('Test useEffect')
  }, []);

  useEffect(() => {
    if (answer.length > 0) {
      fillBoard();
    }
  }, [answer]);
  
  // temp
  const boardSize = 5;
  
  function wordBreak() {
    let randAnswer = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    console.log('randAnswer  ->',randAnswer)
    setAnswer(randAnswer.split('')); 
    // answer = randAnswer.split('');
  }


  function fillBoard() {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        row.push({letter: randLetter, isTarget: false});
      }
      board.push(row);
      
    }
    let directionSelector = 0;
    // let directionSelector = Math.floor(Math.random() * 3);
    if (directionSelector === 0) {
      // horizontal
      let randRow = Math.floor(Math.random() * boardSize);
      console.log('answer length', answer)
      let randCol = Math.floor(Math.random() * (boardSize - answer.length));
      console.log('randRow ->', randRow)
      console.log('randCol ->', randCol)
      for (let i = 0; i < answer.length; i++) {
        board[randRow][randCol + i].letter = answer[i];
        board[randRow][randCol + i].isTarget = true;
      }
    }




    console.log(board);
    setLetters(board);
    // letters = board;
  }

  function handleClick(e) {
    console.log(e.target.className)
    if (e.target.className === 'true') {
      e.target.className = 'true clicked';
      correctLetters.push(e.target.innerHTML);
        if (correctLetters.length === answer.length) {
          wordBreak();
          correctLetters = [];
          
        }
    }
  }

  function renderBoard() {
    console.log('Test renderBoard')
    console.log('->>>>>>>>>>>>', answer)
  return letters.map((row, i) => (
    <div key={`row-${i}`} className="letter-row">
      {row.map((obj, j) => (
        <div key={`block-${i}-${j}`} id={`block-${i}-${j}`} className={`${obj.isTarget}`} onClick={(e)=>handleClick(e)}>
          {obj.letter}
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