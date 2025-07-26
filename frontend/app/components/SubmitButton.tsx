import { Button } from "@mui/material";

const SubmitButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      sx={{
        width: 100,
        margin: "0 auto",
        backgroundColor: "#5b7553",
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "0.05rem",
        fontWeight: 300,
        transition: "all 0.3s ease-out",
        position: "relative",
        top: 0,
        ":hover": {
          backgroundColor: "#44573e",
          top: "-6px",
        },
      }}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
