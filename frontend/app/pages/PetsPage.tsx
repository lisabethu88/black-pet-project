import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState, type SetStateAction } from "react";
import PaginationButtons from "~/components/PaginationButtons";
import PetCard from "~/components/PetCard";
import type { PetfinderPet } from "~/types";

const PetsPage = () => {
  const [pets, setPets] = useState<PetfinderPet[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/fetch_pets.php?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPets(data.animals);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  return (
    <Box
      sx={{
        padding: 5,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid key={pet.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
      <PaginationButtons
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </Box>
  );
};

export default PetsPage;
