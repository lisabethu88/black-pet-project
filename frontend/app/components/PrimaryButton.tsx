import { Button } from "@mui/material";
import { Link } from "react-router";

interface PrimaryButtonProps {
  path: string;
  buttonText: string;
}
const PrimaryButton = ({ path, buttonText }: PrimaryButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      component={Link}
      to={`/${path}`}
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
        ":hover": {
          backgroundColor: "#44573e",
          top: "-6px",
        },
      }}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
