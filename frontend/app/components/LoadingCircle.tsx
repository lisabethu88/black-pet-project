import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingCircle = () => {
  return (
    <Box
      sx={{
        justifySelf: "center",
        padding: 5,
        width: "100%",
        height: "100%",
        maxWidth: 1000,
        margin: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default LoadingCircle;
