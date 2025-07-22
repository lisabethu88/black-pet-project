import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import PetCard from "~/components/PetCard";
import { dummyPets } from "~/data/DummyData";

const PetsPage = () => {
  return (
    <Box sx={{ padding: 5, flexGrow: 1 }}>
      <Grid container spacing={2}>
        {dummyPets.map((pet) => (
          <Grid key={pet.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetsPage;
