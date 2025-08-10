import { Box, Button, Link } from "@mui/material";
interface PetfinderButtonProps {
  to: string;
}

const PetfinderButton = ({ to }: PetfinderButtonProps) => {
  return (
    <Button
      component={Link}
      href={to}
      target="_blank"
      sx={{
        borderRadius: 2,
        fontWeight: 600,
        width: "fit-content",
        mr: 2,
        backgroundColor: "#6504b5",
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "0.05rem",
        transition: "all 0.3s ease-out",
        position: "relative",
        top: 0,
        color: "whitesmoke",
        ":hover": {
          transform: "scale(1.05)",
          backgroundColor: "#460382",
        },
      }}
    >
      View on{"  "}
      <Box
        component="img"
        src="/pf-logo.png"
        sx={{ width: 75, marginLeft: 0.75 }}
      />
    </Button>
  );
};

export default PetfinderButton;
