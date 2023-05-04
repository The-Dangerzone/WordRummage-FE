import React, { useState, useEffect } from 'react';
import './styles.css';
import wordArray from './wordList';

// boardSize as prop
function BoardWindow() {
  console.log('Test BoardWindow ----------')
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);
  let correctLetters = [];


  useEffect(() => {
    wordBreak();
    console.log('Test useEffect')
  }, []);

  useEffect(() => {
    if (answer.length > 0) {
      // wipeBoard();
      fillBoard();
      // renderBoard();
    }
  }, [answer]);

  // temp
  const boardSize = 6;

  function wordBreak() {
    let randAnswer = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    console.log('randAnswer  ->', randAnswer)
    setAnswer(randAnswer.split(''));

  }


  function fillBoard() {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        row.push({ letter: randLetter, isTarget: false });
      }
      board.push(row);

    }

    //  Why does this forEach work properly???? Above the board is set to all false and overwritten below to true. If you remove this forEach though it will keep the colors from the previous word.
    document.querySelectorAll('.true').forEach(block => {
      block.style.backgroundColor = 'white';
    });

    let directionSelector = 2;
    // let directionSelector = Math.floor(Math.random() * 3);
    if (directionSelector === 0) {
      // horizontal
      let randRow = Math.floor(Math.random() * boardSize);
      let randCol = Math.floor(Math.random() * boardSize);
      console.log('randRow ->', randRow)
      console.log('randCol ->', randCol)
      if (randCol + answer.length > boardSize) {
        for (let i = 0; i < answer.length; i++) {
          board[randRow][randCol - i].letter = answer[i];
          board[randRow][randCol - i].isTarget = true;
        }
      } else {
        for (let i = 0; i < answer.length; i++) {
          board[randRow][randCol + i].letter = answer[i];
          board[randRow][randCol + i].isTarget = true;
        }
      }
    } else if (directionSelector === 1) {
      // vertical
      let randRow = Math.floor(Math.random() * boardSize);
      let randCol = Math.floor(Math.random() * boardSize);
      console.log('randRow ->', randRow)
      console.log('randCol ->', randCol)
      if (randRow + answer.length > boardSize) {
        for (let i = 0; i < answer.length; i++) {
          board[randRow - i][randCol].letter = answer[i];
          board[randRow - i][randCol].isTarget = true;
        }
      }
      else {
        for (let i = 0; i < answer.length; i++) {
          board[randRow + i][randCol].letter = answer[i];
          board[randRow + i][randCol].isTarget = true;
        }
      }
    } else if (directionSelector === 2) {
      // diagonal
      let randRow = Math.floor(Math.random() * boardSize);
      let randCol = Math.floor(Math.random() * boardSize);
      console.log('randRow ->', randRow)
      console.log('randCol ->', randCol)
      if (randRow + answer.length > boardSize) {
        if (randCol + answer.length > boardSize) {
          for (let i = 0; i < answer.length; i++) {
            board[randRow - i][randCol - i].letter = answer[i];
            board[randRow - i][randCol - i].isTarget = true;
          }
        } else {
          for (let i = 0; i < answer.length; i++) {
            board[randRow - i][randCol + i].letter = answer[i];
            board[randRow - i][randCol + i].isTarget = true;
          }
        }
      } else {
        if (randCol + answer.length > boardSize) {
          for (let i = 0; i < answer.length; i++) {
            board[randRow + i][randCol - i].letter = answer[i];
            board[randRow + i][randCol - i].isTarget = true;
          }
        } else {
          for (let i = 0; i < answer.length; i++) {
            board[randRow + i][randCol + i].letter = answer[i];
            board[randRow + i][randCol + i].isTarget = true;
          }
        }
      }

    }


    console.log(board);
    setLetters(board);
  }

  function handleClick(e) {
    console.log(e.target.className)
    if (e.target.className === 'true') {
      e.target.style.backgroundColor = 'green';
      if (!correctLetters.includes(e.target.id)) {
        correctLetters.push(e.target.id);

      }
      console.log('correctLetters ->', correctLetters)
      if (correctLetters.length === answer.length) {
        setTimeout(() => {
          correctLetters = [];
          wordBreak();
        }, 1000);

      }
    } else {
      e.target.style.backgroundColor = 'red';
      setTimeout(() => {
        e.target.style.backgroundColor = 'white';
      }, 1000);
    }
  }


  function renderBoard() {
    console.log('Test renderBoard')
    console.log('->>>>>>>>>>>>', answer)

    return letters.map((row, i) => (
      <div key={`row-${i}`} className="letter-row">
        {row.map((obj, j) => (
          <div key={`block-${i}-${j}`} id={`block-${i}-${j}`} className={`${obj.isTarget}`} onClick={(e) => handleClick(e)} >
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