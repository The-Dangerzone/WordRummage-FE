import './styles.css';
import Rain from '../../Rain';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../Context/Settings';

const CountDown = () => {
  const { setCountDownFlag } = useContext(SettingsContext);
  const [countDownNumber, setCountDownNumber] = useState(3);
  const [showNumber, setShowNumber] = useState(true);

  useEffect(() => {
    if (countDownNumber > 0) {
      const timeout = setTimeout(() => {
        setShowNumber(false);
        setTimeout(() => {
          setCountDownNumber(countDownNumber - 1);
          setShowNumber(true);
        }, 500);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setCountDownFlag(false);
    }
  }, [countDownNumber, setCountDownFlag]);

  return (
    <div className='count-down-container'>
        <div className='rain-container'>
      <Rain />  
      </div>
      <div className={`count-down-number ${showNumber ? 'show' : 'hide'}`}>
        {countDownNumber}
      </div>
    </div>
  );
};

export default CountDown;
