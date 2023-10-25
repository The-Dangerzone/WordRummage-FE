import { useContext, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Select, MenuItem } from '@mui/material';
import './styles.css';

const EventTracker = () => {
  const [selectedRound, setSelectedRound] = useState(1);
  const { eventLog } = useContext(SettingsContext);

  function handleRoundChange(event) {
    setSelectedRound(parseInt(event.target.value));
  }

  const selectedRoundData = eventLog.find((roundData) => roundData[0].round === selectedRound);
  const lettersMatrix = selectedRoundData ? selectedRoundData[0].letters : [];
  

  // This if  statement is used if you click quit game round 1 then try to review the eventlog.
  if (eventLog.length === 0) {
    return <div className="GO-board-window">No Data</div>;
  }

  return (


    <div className="GO-board-window">
      <div className='GO-header'>
        <Select value={selectedRound} sx={{ width: '180px', background: 'rgb(33, 70, 40)', color: 'white' }} onChange={handleRoundChange} MenuProps={{PaperProps: { style: { maxHeight: 200 }}}}>
          {eventLog.map((roundData, index) => (
            <MenuItem key={index} value={roundData[0].round }>
              Round {roundData[0].round}
            </MenuItem>
          ))}
        </Select>
        <div className="GO-target-word">Target Word: {`${selectedRoundData[0].targetWord}`}</div>
      </div>
      <div className="GO-game-container">
        {lettersMatrix.map((row, i) => (
          <div key={`row-${i}`} className="GO-letter-row">
            {row.map((obj, j) => (
              <div key={`block-${i}-${j}`} id={`block-${i}-${j}`} className={`GO-${obj.isTarget}`}>{obj.letter}</div>
            ))}
          </div>
        ))}
      </div>
    </div>

  );
}
export default EventTracker;
