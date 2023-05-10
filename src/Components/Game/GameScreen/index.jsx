import BoardWindow from "../BoardWindow";
import ScoreWindow from "../ScoreWindow";
import TimerBar from "../TimerBar";
import GameOver from "../GameOver";
import { SettingsContext } from "../../../Context/Settings";
import './styles.css';
import { Box } from '@mui/material';
import { useContext } from "react";


const GameScreen = () => {

  const { gameOver } = useContext(SettingsContext)

  return (
    <Box>
      {gameOver ? (
        <GameOver />
      ) : (
        <>
          <BoardWindow />
          <div className="score-timer-container">
            <TimerBar />
            <ScoreWindow />
          </div>
        </>
      )}
    </Box>
  );
}

export default GameScreen;