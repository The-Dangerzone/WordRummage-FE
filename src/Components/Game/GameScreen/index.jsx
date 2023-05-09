import BoardWindow from "../BoardWindow";
import ScoreWindow from "../ScoreWindow";
import TimerBar from "../TimerBar";
import './styles.css';


const GameScreen = () => {


  return (
    <>
      <BoardWindow />
      <div className="score-timer-container">
        <TimerBar />
        <ScoreWindow />
      </div>
    </>
  );
}

export default GameScreen;