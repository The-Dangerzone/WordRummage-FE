import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import correct from "../../../assets/audio/right_answer.mp3";
import incorrect from "../../../assets/audio/wrong_answer.mp3";
import roundOver from "../../../assets/audio/round_over.mp3";
import completed from "../../../assets/audio/completed_word.mp3";
import wordsArray from './wordList';
import './styles.css';
import { UserContext } from '../../../Context/User';
// import axios from 'axios';

const correctAudio = new Audio(correct);
const incorrectAudio = new Audio(incorrect);
const roundOverAudio = new Audio(roundOver);
const completedAudio = new Audio(completed);

const [fourLetterWordArray, fiveLetterWordArray, sixLetterWordArray] = wordsArray;

function BoardWindow() {
  const [letters, setLetters] = useState([]);
  const { 
    validUser,
    setValidUser, 
    updateUser,
    isLoggedIn,
   } = useContext(UserContext);
  let tempLetter = [];


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
    insaneAlphabet,
    setCurrentBoardSize,
    effectVolume,
    customWordArray,
    customWordFlag,
    inGame,
    setInGame,
    selectedMode,

  } = useContext(SettingsContext);

  const [customFourLetterArray, customFiveLetterArray, customSixLetterArray] = customWordArray;



  // Saves BoardSize For Replay Button
  if (round === 1) {
    setCurrentBoardSize(boardSize);
  }

  // Check for if gameover timer runs out
  if (displayTimer) {
    if (gameTimer <= 0) {
      if (streak > maxStreak) {
        setMaxStreak(streak);
      }
      setEventLog([...eventLog, [{ round: round, targetWord: answer.join(''), score: score, letters: letters }]])
      setGameOver(true);
      setInGame(false);
      // update user
      if(selectedMode === 1){
        updateUser({ ...validUser, normalMode: { ...validUser.normalMode, gamesPlayed: validUser.normalMode.gamesPlayed + 1, highScore: Math.max(validUser.normalMode.highScore, score), maxStreak: Math.max(validUser.normalMode.maxStreak, maxStreak) }});
      } else if(selectedMode === 2){
        updateUser({ ...validUser, insaneMode: { ...validUser.insaneMode, gamesPlayed: validUser.insaneMode.gamesPlayed + 1, highScore: Math.max(validUser.insaneMode.highScore, score), maxStreak: Math.max(validUser.insaneMode.maxStreak, maxStreak) }});
      }
    }
  }



  // Check for if time runs out for the round
  if (displayRoundTimer) {
    if (roundTimer >= 100) {
      roundOverAudio.volume = effectVolume / 100;
      roundOverAudio.play();
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
    completedAudio.volume = effectVolume / 100;
    completedAudio.play();
    setTimeout(() => {
      setGameTimer(gameTimer + Math.ceil(boardSize / 2))
      setScore(score + (boardSize * multiplier));
      setEventLog([...eventLog, [{ round: round, targetWord: answer.join(''), score: score, letters: letters }]])
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
    let selectedArray;
    if (boardSize < 8) {
      if (customWordFlag) {
        selectedArray = customFourLetterArray;
      } else {
        selectedArray = fourLetterWordArray;
      }
    } else if (boardSize < 10) {
      if (customWordFlag) {
        if (customFiveLetterArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * 2);
          selectedArray = randomIndex === 0 ? customFourLetterArray : customFiveLetterArray;
        } else {
          selectedArray = customFourLetterArray;
        }
      } else {
        const randomIndex = Math.floor(Math.random() * 2);
        selectedArray = randomIndex === 0 ? fourLetterWordArray : fiveLetterWordArray;
      }
    } else {
      if (customWordFlag) {
        if (customSixLetterArray.length > 0 && customFiveLetterArray.length > 0) {
        
          const randomIndex = Math.floor(Math.random() * 3);
          if (randomIndex === 0) {
            selectedArray = customFourLetterArray;
          } else if (randomIndex === 1) {
            selectedArray = customFiveLetterArray;
          } else {
            selectedArray = customSixLetterArray;
          }
        } else if (customSixLetterArray.length > 0 && customFiveLetterArray.length === 0) {
          const randomIndex = Math.floor(Math.random() * 2);
          selectedArray = randomIndex === 0 ? customFourLetterArray : customSixLetterArray;
        } else if (customSixLetterArray.length === 0 && customFiveLetterArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * 2);
          selectedArray = randomIndex === 0 ? customFourLetterArray : customFiveLetterArray;
        } else {
          selectedArray = customFourLetterArray;
        }
      } else {
        const randomIndex = Math.floor(Math.random() * 3);
        if (randomIndex === 0) {
          selectedArray = fourLetterWordArray;
        } else if (randomIndex === 1) {
          selectedArray = fiveLetterWordArray;
        } else {
          selectedArray = sixLetterWordArray;
        }
      }
    }
    let randAnswer = selectedArray[Math.floor(Math.random() * selectedArray.length)].toUpperCase();
    setAnswer(randAnswer.split(''));
    setResetTimer(false);
    setCorrectLetters([]);
  }

  function fillHorizontalLeft(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row][col - i].letter = answer[i];
      board[row][col - i].isTarget = true;
    }
  }

  function fillHorizontalRight(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row][col + i].letter = answer[i];
      board[row][col + i].isTarget = true;
    }
  }

  function fillVerticalUp(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col].letter = answer[i];
      board[row - i][col].isTarget = true;
    }
  }

  function fillVerticalDown(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col].letter = answer[i];
      board[row + i][col].isTarget = true;
    }
  }

  function fillDiagonalUpLeft(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col - i].letter = answer[i];
      board[row - i][col - i].isTarget = true;
    }
  }

  function fillDiagonalUpRight(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row - i][col + i].letter = answer[i];
      board[row - i][col + i].isTarget = true;
    }
  }

  function fillDiagonalDownLeft(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col - i].letter = answer[i];
      board[row + i][col - i].isTarget = true;
    }
  }

  function fillDiagonalDownRight(row, col, board) {
    for (let i = 0; i < answer.length; i++) {
      board[row + i][col + i].letter = answer[i];
      board[row + i][col + i].isTarget = true;
    }
  }

  function fillBoard() {

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (insaneAlphabet) {
      alphabet = answer.join('');
    }

    const board = [];
    let checkWord = [];
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
    // console.log('Word starts at -> ', randRow, randCol);


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

    // Checker for target word randomly spelled out on board
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        // Check first letter of answer
        if (board[i][j].letter === answer[0]) {
          checkWord.push({ board: board[i][j], i: i, j: j }); // push first letter to checkWord

          //check right
          if (j + answer.length <= boardSize && j >= 0) {
            if (board[i][j + 1].letter === answer[1]) {
              checkWord.push({ board: board[i][j + 1], i: i, j: j + 1 }); // push second letter to checkWord
              for (let k = 2; k < answer.length; k++) {
                if (board[i][j + k].letter === answer[k]) {
                  checkWord.push({ board: board[i][j + k], i: i, j: j + k });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          //check left
          if (j - answer.length >= -1 && j >= 0) {
            if (board[i][j - 1].letter === answer[1]) {
              checkWord.push({ board: board[i][j - 1], i: i, j: j - 1 }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i][j - k].letter === answer[k]) {
                  checkWord.push({ board: board[i][j - k], i: i, j: j - k });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          //check down
          if (i + answer.length <= boardSize && j >= 0) {
            if (board[i + 1][j].letter === answer[1]) {
              checkWord.push({ board: board[i + 1][j], i: i + 1, j: j }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i + k][j].letter === answer[k]) { // I'm here
                  checkWord.push({ board: board[i + k][j], i: i + k, j: j });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          //check up
          if (i - answer.length >= -1 && j >= 0) {
            if (board[i - 1][j].letter === answer[1]) {
              checkWord.push({ board: board[i - 1][j], i: i - 1, j: j }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i - k][j].letter === answer[k]) {
                  checkWord.push({ board: board[i - k][j], i: i - k, j: j });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          // check diagonal down right
          if (i + answer.length <= boardSize && j + answer.length <= boardSize && j >= 0) {
            if (board[i + 1][j + 1].letter === answer[1]) {
              checkWord.push({ board: board[i + 1][j + 1], i: i + 1, j: j + 1 }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i + k][j + k].letter === answer[k]) {
                  checkWord.push({ board: board[i + k][j + k], i: i + k, j: j + k });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          // check diagonal down left
          if (i + answer.length <= boardSize && j - answer.length >= -1 && j >= 0) {
            if (board[i + 1][j - 1].letter === answer[1]) {
              checkWord.push({ board: board[i + 1][j - 1], i: i + 1, j: j - 1 }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i + k][j - k].letter === answer[k]) {
                  checkWord.push({ board: board[i + k][j - k], i: i + k, j: j - k });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          // check diagonal up right
          if (i - answer.length >= -1 && j + answer.length <= boardSize && j >= 0) {
            if (board[i - 1][j + 1].letter === answer[1]) {
              checkWord.push({ board: board[i - 1][j + 1], i: i - 1, j: j + 1 }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i - k][j + k].letter === answer[k]) {
                  checkWord.push({ board: board[i - k][j + k], i: i - k, j: j + k });
                }
              }
              if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }
            }
          }
          // check diagonal up left
          if (i - answer.length >= -1 && j - answer.length >= -1 && j >= 0) {
            if (board[i - 1][j - 1].letter === answer[1]) {
              checkWord.push({ board: board[i - 1][j - 1], i: i - 1, j: j - 1 }); // push second letter to checkWord

              for (let k = 2; k < answer.length; k++) {
                if (board[i - k][j - k].letter === answer[k]) {
                  checkWord.push({ board: board[i - k][j - k], i: i - k, j: j - k });
                }
              } if (checkWord.length === answer.length && answer.length > 1) {
                for (let l = 0; l < checkWord.length; l++) {
                  if (checkWord[l].board.isTarget === false) {
                    tempLetter = checkWord[l].board.letter;
                    while (tempLetter === board[checkWord[l].i][checkWord[l].j].letter) {
                      board[checkWord[l].i][checkWord[l].j].letter = alphabet[Math.floor(Math.random() * alphabet.length)]
                      i = 0;
                      j = -1;
                    }
                  }
                }
              }
              while (checkWord.length > 1) {
                checkWord.pop();
              }

            }
          }
          checkWord = [];
        }
      }
    }
    setLetters(board);

  }

  function handleClick(e) {
    if (roundTimer > 0) {

      if (e.target.className === 'true') {
        e.target.style.backgroundColor = 'green';
        if (!correctLetters.includes(e.target.id)) {
          setCorrectLetters([...correctLetters, e.target.id]);
          if(isLoggedIn){
            if(selectedMode === 1){
              setValidUser({ ...validUser, normalMode: { ...validUser.normalMode, accuracy: { ...validUser.normalMode.accuracy, correct: validUser.normalMode.accuracy.correct + 1 } }});
            } else if(selectedMode === 2){
              setValidUser({ ...validUser, insaneMode: { ...validUser.insaneMode, accuracy: { ...validUser.insaneMode.accuracy, correct: validUser.insaneMode.accuracy.correct + 1 } }});
            }
          }
        }
        if (correctLetters.length < answer.length - 1) {
          correctAudio.currentTime = 0;
          correctAudio.volume = effectVolume / 100;
          correctAudio.play();
        }
      } else {
        e.target.style.backgroundColor = 'red';
        setIncorrectLetters(incorrectLetters + 1);
        if(isLoggedIn){
          if(selectedMode === 1){
            setValidUser({ ...validUser, normalMode: { ...validUser.normalMode, accuracy: { ...validUser.normalMode.accuracy, incorrect: validUser.normalMode.accuracy.incorrect + 1 } }});
          } else if(selectedMode === 2){
            setValidUser({ ...validUser, insaneMode: { ...validUser.insaneMode, accuracy: { ...validUser.insaneMode.accuracy, incorrect: validUser.insaneMode.accuracy.incorrect + 1 } }});
          }
        }
        if (score > 0) {
          let tempScore = score - (Math.floor(boardSize / 2))
          if (tempScore > 0) {
            setScore(tempScore);
          } else {
            setScore(0);
          }
        }
        incorrectAudio.volume = effectVolume / 100;
        incorrectAudio.play();
        setTimeout(() => {
          e.target.style.backgroundColor = 'white';
        }, 1500);
      }
    }
  }


  function renderBoard() {

    return letters.map((row, i) => (
      <div key={`row-${i}`} className="letter-row">
        {row.map((obj, j) => (
          <div key={`block-${i}-${j}`}
            id={`block-${i}-${j}`}
            className={`${obj.isTarget}`}
            onClick={(e) => handleClick(e)}
            ref={(element) => {
              if (element) {
                const targetFontSize = 0.6 * element.clientHeight; // Change the percentage here to adjust font size
                element.style.fontSize = `${targetFontSize}px`;
              }
            }}

          >
            {obj.letter}
          </div>
        ))}
      </div>
    ));
  }

  return (
    <>
      <div className="board-window">
        <div className="target-word">{answer.join('')}</div>
        <div className="game-container">{renderBoard()}</div>
      </div>
    </>
  );
}

export default BoardWindow;