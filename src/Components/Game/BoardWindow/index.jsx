import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import './styles.css';
import wordArray from './wordList';

function BoardWindow() {
  // console.log('Test BoardWindow ----------')
  const [letters, setLetters] = useState([]);

  let checkArray = [];
  let board = [];
  let directions = [
    [0, 1], //down
    [0, -1], // up
    [1, 0], // right
    [-1, 0], // left
    [-1, -1], // up left
    [-1, 1], // up right
    [1, -1], // down left
    [1, 1], // down right
  ];

  const {
    setBoardSize,
    boardSize,
    setResetTimer,
    setScore,
    score,
    setRound,
    round,
    allowBoardGrowth,
    answer,
    setAnswer,
    correctLetters,
    setCorrectLetters,
    roundTimer,
    gameTimer,
    setGameTimer,
    setGameOver,
    displayRoundTimer,
    incorrectLetters,
    setIncorrectLetters,
    setStreak,
    streak,
    displayTimer,
    multiplier,
    setMultiplier,
    maxStreak,
    setMaxStreak,
    setEventLog,
    eventLog,

  } = useContext(SettingsContext);



  // Check for if gameover timer runs out
  if (displayTimer) {
    if (gameTimer <= 0) {
      if (streak > maxStreak) {
        setMaxStreak(streak);
      }
      setEventLog([...eventLog, [{ round: round, targetWord: answer.join(''), score: score, letters: letters }]])
      setGameOver(true);
    }
  }



  // Check for if time runs out for the round
  if (displayRoundTimer) {
    if (roundTimer >= 100) {
      setCorrectLetters([]);
      setResetTimer(true);
      setTimeout(() => {
        setGameTimer(gameTimer - 3)
        setRound(round + 1);
        setEventLog([...eventLog, [{ round: round, targetWord: answer.join(''), score: score, letters: letters }]])
        if (streak > maxStreak) {
          setMaxStreak(streak);
        }
        setStreak(0);
        setMultiplier(1);
        if (allowBoardGrowth) {
          if (round % 5 === 0) {
            setBoardSize(boardSize + 1);
          }
        }
        wordBreak();
      }, 1000);
    }
  }
  // Check for if correct word is found
  if (correctLetters.length === answer.length && correctLetters.length !== 0) {
    setCorrectLetters([]);
    setResetTimer(true);
    setTimeout(() => {
      setGameTimer(gameTimer + Math.ceil(boardSize / 2))
      setScore(score + (boardSize * multiplier));
      setEventLog([...eventLog, [{ round: round, targetWord: answer.join(''), score: score, letters: letters }]])
      console.log('eventLog ->', eventLog)
      setRound(round + 1);
      setStreak(streak + 1);
      if (streak === 2) {
        setMultiplier(2);
      }
      if (streak === 5) {
        setMultiplier(3);
      }
      if (allowBoardGrowth) {
        if (round % 5 === 0) {
          setBoardSize(boardSize + 1);
        }
      }
      wordBreak();
    }, 1000);

  }

  useEffect(() => {
    wordBreak();
  }, []);

  useEffect(() => {
    if (answer.length > 0) {
      fillBoard();
    }
  }, [answer]);

  function wordBreak() {
    let randAnswer = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    console.log('randAnswer  ->', randAnswer)
    setAnswer(randAnswer.split(''));
    setResetTimer(false);
    setCorrectLetters([]);
  }

  function fillHorizontalLeft(row, col, board) {
    // console.log('fillHorizontalLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row][col - i].letter = answer[i];
      board[row][col - i].isTarget = true;
    }
  }

  function fillHorizontalRight(row, col, board) {
    // console.log('fillHorizontalRight')
    for (let i = 0; i < answer.length; i++) {
      board[row][col + i].letter = answer[i];
      board[row][col + i].isTarget = true;
    }
  }

  function fillVerticalUp(row, col, board) {
    // console.log('fillVerticalUp')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col].letter = answer[i];
      board[row - i][col].isTarget = true;
    }
  }

  function fillVerticalDown(row, col, board) {
    // console.log('fillVerticalDown')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col].letter = answer[i];
      board[row + i][col].isTarget = true;
    }
  }

  function fillDiagonalUpLeft(row, col, board) {
    // console.log('fillDiagonalUpLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col - i].letter = answer[i];
      board[row - i][col - i].isTarget = true;
    }
  }

  function fillDiagonalUpRight(row, col, board) {
    // console.log('fillDiagonalUpRight')
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col + i].letter = answer[i];
      board[row - i][col + i].isTarget = true;
    }
  }

  function fillDiagonalDownLeft(row, col, board) {
    // console.log('fillDiagonalDownLeft')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col - i].letter = answer[i];
      board[row + i][col - i].isTarget = true;
    }
  }

  function fillDiagonalDownRight(row, col, board) {
    // console.log('fillDiagonalDownRight')
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col + i].letter = answer[i];
      board[row + i][col + i].isTarget = true;
    }
  }

  function recursiveCheck(row, col, answerIndex) {
    // Check if word search is complete
    if (answerIndex === answer.length) {
      if (checkArray.length === answer.length) {
        return false;
      } else {
        return true;
      }
    }

    if (board[row][col].isTarget) {
      checkArray.push(board[row][col]);
    }

    // Check if indices are within matrix bounds
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      return false;
    }

    // Check if the current element matches the word character
    if (board[row][col].letter !== answer[answerIndex]) {
      console.log('IN RECURSION BUT NOT MATCHING')
      return false;
    }

    // Recursively search the neighboring elements
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (recursiveCheck(newRow, newCol, answerIndex + 1)) {
        return true;
      }
    }
    if (checkArray.length > 0) {
      checkArray.pop();
    }
  }

  function checkBoard() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j].letter === answer[0]) {
          if (recursiveCheck(i, j, 0)) {
            console.log('FOUND IT')
            fillBoard();
          }

        }
      }
    }
  }

  function fillBoard() {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // const board = [];
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
    // console.log('randRow ->', randRow);
    // console.log('randCol ->', randCol);

    // if bool1 is false, cant print right
    let bool1 = randCol + answer.length <= boardSize;
    // if bool2 is false, cant print down
    let bool2 = randRow + answer.length <= boardSize;
    // if bool3 is false, cant print left
    let bool3 = randCol - answer.length >= -1;
    // if bool4 is false, cant print up
    let bool4 = randRow - answer.length >= -1;


    if (bool1 && bool2 && bool3 && bool4) {
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalUp, fillVerticalDown, fillDiagonalUpLeft, fillDiagonalUpRight, fillDiagonalDownLeft, fillDiagonalDownRight];

      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2 && bool3) {
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalDown, fillDiagonalDownLeft, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2 && bool4) {
      let functionsArr = [fillHorizontalRight, fillVerticalUp, fillVerticalDown, fillDiagonalUpRight, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool3 && bool4) {
      let functionsArr = [fillHorizontalLeft, fillHorizontalRight, fillVerticalUp, fillDiagonalUpLeft, fillDiagonalUpRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool2 && bool3 && bool4) {
      let functionsArr = [fillHorizontalLeft, fillVerticalUp, fillVerticalDown, fillDiagonalUpLeft, fillDiagonalDownLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool2) {
      let functionsArr = [fillHorizontalRight, fillVerticalDown, fillDiagonalDownRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool3 && bool4) {
      let functionsArr = [fillHorizontalLeft, fillVerticalUp, fillDiagonalUpLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool1 && bool4) {
      let functionsArr = [fillHorizontalRight, fillVerticalUp, fillDiagonalUpRight];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    } else if (bool2 && bool3) {
      let functionsArr = [fillHorizontalLeft, fillVerticalDown, fillDiagonalDownLeft];
      let randomIdx = Math.floor(Math.random() * functionsArr.length);
      functionsArr[randomIdx](randRow, randCol, board);

    }

    setLetters(board);
    // console.log('board ->', board);
    // checkBoard();
    board = [];
  }

  function handleClick(e) {
    if (e.target.className === 'true') {
      e.target.style.backgroundColor = 'green';
      if (!correctLetters.includes(e.target.id)) {
        setCorrectLetters([...correctLetters, e.target.id]);

      }
      // console.log('correctLetters ->', correctLetters)

    } else {
      e.target.style.backgroundColor = 'red';
      setIncorrectLetters(incorrectLetters + 1)
      if (score > 0) {
        setScore(score - (Math.floor(boardSize / 2)));
      }
      setTimeout(() => {
        e.target.style.backgroundColor = 'white';
      }, 1500);
    }
  }

  function renderBoard() {

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