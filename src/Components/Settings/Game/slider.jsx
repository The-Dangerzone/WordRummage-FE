import React, { useContext } from 'react';
import { Slider } from '@mui/material';
import { SettingsContext } from '../../../Context/Settings';

const BoardSizeSlider = () => {
  const { boardSize, setBoardSize } = useContext(SettingsContext);

  const handleChange = (event, newvalue) => {
    setBoardSize(newvalue);
  };

  return (
    <Slider
      value={boardSize}
      valueLabelDisplay="auto"
      step={1}
      marks
      min={6}
      max={20}
      onChange={handleChange}
    />
  );
};

export default BoardSizeSlider;
