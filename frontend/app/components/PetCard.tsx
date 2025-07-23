import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import type { PetfinderPet } from "~/types"; // make sure you import the right type
import PrimaryButton from "./PrimaryButton";

interface PetCardProps {
  pet: PetfinderPet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const mainPhoto = pet.photos?.[0]?.medium || "/placeholder.png";

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
          <Typography variant="h6" sx={{ color: "#5b7553", fontWeight: 700 }}>
            {pet.name}
          </Typography>

          <Chip label={pet.age} size="small" />
        </Stack>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {pet.breeds.primary} • {pet.gender} • {pet.size}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }} noWrap>
          {pet.description || "No description available."}
        </Typography>

        <PrimaryButton path={pet.url} buttonText="View on Petfinder" />

        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            {pet.contact.address.postcode &&
              `Located near ${pet.contact.address.postcode}`}
            {pet.distance ? ` • ${pet.distance.toFixed(1)} miles away` : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;
