import { Button } from "@mui/material";
import { Link } from "react-router";

interface PrimaryButtonProps {
  path: string;
  buttonText: string;
  bgColor?: string;
}
const PrimaryButton = ({ path, buttonText, bgColor }: PrimaryButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      component={Link}
      to={`/${path}`}
      sx={{
        borderRadius: 2,
        width: "fit-content",
        mr: 2,
        backgroundColor: bgColor ? bgColor : "#5b7553",
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "0.05rem",
        fontWeight: 600,
        transition: "all 0.3s ease-out",
        position: "relative",
        top: 0,
        ":hover": {
          backgroundColor: "#44573e",
          transform: "scale(1.05)",
        },
      }}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
