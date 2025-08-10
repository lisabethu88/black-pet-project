import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
interface LoadingCircleProps {
  loadingText?: string;
}
const LoadingCircle = ({ loadingText }: LoadingCircleProps) => {
  return (
    <Box
      sx={{
        justifySelf: "center",
        padding: 5,
        width: "100%",
        height: "100%",
        maxWidth: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{loadingText}</Typography>
      <CircularProgress color="success" />
    </Box>
  );
};

export default LoadingCircle;
