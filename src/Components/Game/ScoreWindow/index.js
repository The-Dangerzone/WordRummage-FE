import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { SettingsContext } from "../../../Context/Settings";

const ScoreWindow = () => {

  const { score, round, displayScore } = useContext(SettingsContext);

  return (
    <Box>

      {displayScore && (
        <Box>
          <Typography variant="h4">Score: {score}</Typography>
          <Typography variant="h4">Round: {round}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ScoreWindow;