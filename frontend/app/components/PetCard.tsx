import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Chip,
  Link,
} from "@mui/material";
import type { PetfinderPet } from "~/types"; // make sure you import the right type
import LinkButton from "./LinkButton";

interface PetCardProps {
  pet: PetfinderPet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const mainPhoto =
    pet.photos?.[0]?.medium ||
    (pet.species === "Dog"
      ? "/placeholder.png"
      : pet.species === "Cat"
      ? "/cat.png"
      : "/paw.png");

  return (
    <Card sx={{ height: "100%", borderRadius: 5 }}>
      <CardMedia
        component="img"
        image={mainPhoto}
        alt={pet.name}
        sx={{ objectFit: "cover", height: 350 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" sx={{ color: "#5b7553", fontWeight: 700 }}>
            {pet.name}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              label={pet.species}
              size="small"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.87)",
                color: "#ebebeb",
              }}
            />
            <Chip label={pet.age} size="small" />
          </Stack>
        </Stack>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {pet.breeds.primary} • {pet.gender} • {pet.size}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }} noWrap>
          {pet.description || "No description available."}
        </Typography>

        <LinkButton to={pet.url} buttonText={"View on Petfinder"} />
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            Located in {pet.contact.address.state}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;
