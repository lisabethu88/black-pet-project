import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState, type SetStateAction } from "react";
import LoadingCircle from "~/components/LoadingCircle";
import PaginationButtons from "~/components/PaginationButtons";
import PetCard from "~/components/PetCard";
import type { PetfinderPet } from "~/types";

const PetsPage = () => {
  const [pets, setPets] = useState<PetfinderPet[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_RENDER_URL;
  console.log(API_URL);

  useEffect(() => {
    fetch(`${API_URL}/fetch_pets.php?page=${page}`)
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

  if (loading) return <LoadingCircle />;
  if (error) return null;
  return (
    <Box
      sx={{
        padding: 2,
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
      {totalPages > 1 && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </Box>
  );
};

export default PetsPage;
