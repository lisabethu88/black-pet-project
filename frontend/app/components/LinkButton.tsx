import { Button, Link } from "@mui/material";

interface LinkButtonProps {
  to: string;
  buttonText: string;
}
const LinkButton = ({ to, buttonText }: LinkButtonProps) => {
  return (
    <Button
      component={Link}
      href={to}
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
      }}
    >
      {buttonText}
    </Button>
  );
};

export default LinkButton;
