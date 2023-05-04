import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css';
import wordArray from './wordList';

// boardSize as prop
function BoardWindow() {
  // console.log('Test BoardWindow ----------')
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);
  let correctLetters = [];

  const { boardSize } = useContext(SettingsContext);


  useEffect(() => {
    wordBreak();
    // console.log('Test useEffect')
  }, []);

  useEffect(() => {
    if (answer.length > 0) {
      fillBoard();
    }
  }, [answer]);

  // temp
  // const boardSize = 6;

  function wordBreak() {
    let randAnswer = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    console.log('randAnswer  ->', randAnswer)
    setAnswer(randAnswer.split(''));

  }

  function fillHorizontalLeft(row, col, board) {
    console.log('fillHorizontalLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row][col - i].letter = answer[i];
      board[row][col - i].isTarget = true;
    }
  }

  function fillHorizontalRight(row, col, board) {
    console.log('fillHorizontalRight')
    for (let i = 0; i < answer.length; i++) {
      board[row][col + i].letter = answer[i];
      board[row][col + i].isTarget = true;
    }
  }

  function fillVerticalUp(row, col, board) {
    console.log('fillVerticalUp')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col].letter = answer[i];
      board[row - i][col].isTarget = true;
    }
  }

  function fillVerticalDown(row, col, board) {
    console.log('fillVerticalDown')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col].letter = answer[i];
      board[row + i][col].isTarget = true;
    }
  }

  function fillDiagonalUpLeft(row, col, board) {
    console.log('fillDiagonalUpLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col - i].letter = answer[i];
      board[row - i][col - i].isTarget = true;
    }
  }

  function fillDiagonalUpRight(row, col, board) {
    console.log('fillDiagonalUpRight')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col + i].letter = answer[i];
      board[row - i][col + i].isTarget = true;
    }
  }

  function fillDiagonalDownLeft(row, col, board) {
    console.log('fillDiagonalDownLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col - i].letter = answer[i];
      board[row + i][col - i].isTarget = true;
    }
  }

  function fillDiagonalDownRight(row, col, board) {
    console.log('fillDiagonalDownRight')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col + i].letter = answer[i];
      board[row + i][col + i].isTarget = true;
    }
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
    document.querySelectorAll('.false').forEach(block => {
      block.style.backgroundColor = 'white';
    });


    let randRow = Math.floor(Math.random() * boardSize);
    let randCol = Math.floor(Math.random() * boardSize);
    console.log('randRow ->', randRow);
    console.log('randCol ->', randCol);

    // if bool1 is false, cant print right
    let bool1 = randCol + answer.length <= boardSize;
    // if bool2 is false, cant print down
    let bool2 = randRow + answer.length <= boardSize;
    // if bool3 is false, cant print left
    let bool3 = randCol - answer.length >= -1;
    // if bool4 is false, cant print up
    let bool4 = randRow - answer.length >= -1;
    console.log('bool1 ->', bool1);
    console.log('bool2 ->', bool2);
    console.log('bool3 ->', bool3);
    console.log('bool4 ->', bool4);

    if (bool1 && bool2 && bool3 && bool4) {
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalUp, fillVerticalDown, fillDiagonalUpLeft, fillDiagonalUpRight, fillDiagonalDownLeft, fillDiagonalDownRight];

      console.log('ALL TRUE UP IN HER');
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2 && bool3) {
      console.log('bool1 && bool2 && bool3, cant print up');
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalDown, fillDiagonalDownLeft, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2 && bool4) {
      console.log('bool1 && bool2 && bool4, cant print left');
      let functionsArr = [fillHorizontalRight, fillVerticalUp, fillVerticalDown, fillDiagonalUpRight, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool3 && bool4) {
      console.log('bool1 && bool3 && bool4, cant print down');
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalUp, fillDiagonalUpLeft, fillDiagonalUpRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool2 && bool3 && bool4) {
      console.log('bool2 && bool3 && bool4, cant print right');
      let functionsArr = [fillHorizontalLeft, fillVerticalUp, fillVerticalDown, fillDiagonalUpLeft, fillDiagonalDownLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2) {
      console.log('bool1 && bool2, cant print up or left');
      let functionsArr = [fillHorizontalRight, fillVerticalDown, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool3 && bool4) {
      console.log('bool3 && bool4, cant print down or right');
      let functionsArr = [fillHorizontalLeft, fillVerticalUp, fillDiagonalUpLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool4) {
      console.log('bool1 && bool4, cant print left or down');
      let functionsArr = [fillHorizontalRight, fillVerticalUp, fillDiagonalUpRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool2 && bool3) {
      console.log('bool2 && bool3, cant print right or up');
      let functionsArr = [fillHorizontalLeft, fillVerticalDown, fillDiagonalDownLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    }


    // console.log(board);
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
      }, 1500);
    }
  }


  function renderBoard() {
    // console.log('Test renderBoard')
    // console.log('->>>>>>>>>>>>', answer)

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
      <div className="board-window">
        <div className="target-word">Target Word: {answer.join('')}</div>
        <div className="game-container">{renderBoard()}</div>
      </div>
    </>
  );
}


export default BoardWindow;