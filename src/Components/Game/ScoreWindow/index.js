import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { SettingsContext } from "../../../Context/Settings";

const ScoreWindow = () => {

  const { score, round, displayScore } = useContext(SettingsContext);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: 700, left: '50%', margin: '0 auto', userSelect: 'none', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant="h4">Round: {round}</Typography>
        {displayScore && (
          <Typography variant="h4">Score: {score}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default ScoreWindow;