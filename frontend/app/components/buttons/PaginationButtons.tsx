import { Box, Button } from "@mui/material";
import React from "react";

interface PaginationButtonsProp {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationButtons = ({
  page,
  setPage,
  totalPages,
}: PaginationButtonsProp) => {
  return (
    <Box sx={{ width: "fit-content", margin: "0 auto" }}>
      <Button
        sx={{
          width: "fit-content",
          mr: 2,
          backgroundColor: "#5b7553",
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.05rem",
          fontWeight: 300,
          transition: "all 0.3s ease-out",
          position: "relative",
          top: 0,
          color: "white",
          ":hover": {
            backgroundColor: "#44573e",
            top: "-6px",
          },
          "&.Mui-disabled": {
            backgroundColor: "whitesmoke",
          },
        }}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </Button>
      <span>Page {page}</span>
      <Button
        sx={{
          width: "fit-content",
          m: 2,
          backgroundColor: "#5b7553",
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.05rem",
          fontWeight: 300,
          transition: "all 0.3s ease-out",
          position: "relative",
          top: 0,
          color: "white",
          "&.Mui-disabled": {
            backgroundColor: "whitesmoke",
          },
          ":hover": {
            backgroundColor: "#44573e",
            top: "-6px",
          },
        }}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationButtons;
