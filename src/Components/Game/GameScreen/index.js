import BoardWindow from "../BoardWindow";
import ScoreWindow from "../ScoreWindow";
import TimerBar from "../TimerBar";
import './styles.css';


const GameScreen = () => {


  return (
    <>
      <ScoreWindow/>
      <BoardWindow/>
      <TimerBar/>
    </>
  );
}

export default GameScreen;