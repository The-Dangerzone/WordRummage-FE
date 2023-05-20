import BoardWindow from "../BoardWindow";
import ScoreWindow from "../ScoreWindow";
import TimerBar from "../TimerBar";
import GameOver from "../GameOver";
import MultiplierBar from "../MultiplierBar";
import { SettingsContext } from "../../../Context/Settings";
import './styles.css';
import { Box, Container, Grid } from '@mui/material';
import { useContext } from "react";


const GameScreen = () => {

  const { gameOver } = useContext(SettingsContext)

  return (
    <Box sx={{backgroundColor: "rgb(55, 106, 75)", height: "100vh"}}>
      {gameOver ? (
        <GameOver />
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
                <Box sx={{ flexGrow: 1 }} />
                <MultiplierBar />
              </Container>
            </Container>
          </Container>
        </>
      )}
    </Box>
  );
}

export default GameScreen;