import { Box, Typography } from "@mui/material";
import PrimaryButton from "./buttons/PrimaryButton";
interface ErrorMessageProps {
  errMessage: string;
}

const ErrorMessage = ({ errMessage }: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 2,
      }}
    >
      <>
        <Typography
          variant={"h2"}
          sx={{ fontSize: { xs: "6rem", sm: "7rem", md: "8rem" } }}
        >
          Oops!{" "}
        </Typography>
        <Typography variant="body1">{errMessage}</Typography>
      </>
      <Box
        sx={{ maxWidth: 300, width: "100%" }}
        component="img"
        src="/guinea-pig.png"
      />
      <PrimaryButton path={"/"} buttonText={"Return Home"}></PrimaryButton>
    </Box>
  );
};

export default ErrorMessage;
