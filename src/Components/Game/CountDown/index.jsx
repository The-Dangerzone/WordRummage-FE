import './styles.css';
import { useContext, useEffect, useState } from 'react';

import { SettingsContext } from '../../../Context/Settings';



const CountDown = () => {
  
    const { setCountDownFlag } = useContext(SettingsContext);
  
    const [countDownNumber, setCountDownNumber] = useState(3);
  
    useEffect(() => {
      if (countDownNumber > 0) {
        setTimeout(() => {
          setCountDownNumber(countDownNumber - 1);
        }, 1500);
      } else {
        setCountDownFlag(false);
      }
    }, [countDownNumber]);
  
    return (
      <div className='count-down-container'>
        <h1 className='count-down-number'>{countDownNumber}</h1>
      </div>
    );
};

export default CountDown;