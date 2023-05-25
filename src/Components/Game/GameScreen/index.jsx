import BoardWindow from "../BoardWindow";
import ScoreWindow from "../ScoreWindow";
import TimerBar from "../TimerBar";
import GameOver from "../GameOver";
import CountDown from "../CountDown";
import MultiplierBar from "../MultiplierBar";
import { SettingsContext } from "../../../Context/Settings";
import './styles.css';
import { Box, Container } from '@mui/material';
import { useContext } from "react";


const GameScreen = () => {

  const { gameOver, countDownFlag } = useContext(SettingsContext)

  return (
    <Box sx={{ backgroundColor: "rgb(55, 106, 75)", height: "100vh" }}>
      {gameOver ? (
        <GameOver />
      ) : countDownFlag ? (
        <CountDown />
      ) : (
        <>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Container>
            </Container>
            <Container>
              <BoardWindow />
              <div className="score-timer-container">
                <TimerBar />
                <ScoreWindow />
              </div>
            </Container>
            <Container>
              <Container sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1, userSelect: "none" }} />
                <MultiplierBar />
              </Container>
            </Container>
          </Container>
        </>
      )}
    </Box>
  );
};

export default GameScreen;