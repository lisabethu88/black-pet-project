import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState, type SetStateAction } from "react";
import LoadingCircle from "~/components/LoadingCircle";
import PaginationButtons from "~/components/buttons/PaginationButtons";
import PetCard from "~/components/PetCard";
import PetsFilter from "~/components/PetsFilter";
import type { PetFilters, PetfinderPet } from "~/types";
import ErrorMessage from "~/components/ErrorMessage";

const PetsPage = () => {
  const [pets, setPets] = useState<PetfinderPet[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PetFilters>({
    type: "",
    gender: "",
    size: "",
    age: "",
    sort: "",
    zip: "",
  });
  const API_URL = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    const params = new URLSearchParams({
      page: String(page),
      ...(filters.type && { species: filters.type }),
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.age && { age: filters.age }),
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.sort === "distance" &&
        filters.zip && { location: filters.zip }),
    });

    if (filters.sort === "distance" && !filters.zip) {
      return;
    }
    fetch(`${API_URL}/fetch_pets.php?${params.toString()}`)
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
  }, [page, filters]);

  if (loading) return <LoadingCircle loadingText="Loading pets..." />;
  if (error) return <ErrorMessage errMessage={error} />;
  return (
    <Box
      id="pets-page"
      sx={{
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: 700 }}>
        <Typography variant="h2" color="#5a7552">
          Adopt a Pet Today
        </Typography>

        <br />

        <Typography
          variant="h3"
          color="black"
          fontWeight={300}
          sx={{ mb: 2, fontStyle: "italic" }}
        >
          <b>
            <b>Note:</b>
          </b>{" "}
          Not all pets shown are fully black. Petfinder includes animals with
          any black in their fur when filtering by color.
        </Typography>
      </Box>
      <PetsFilter setFilters={setFilters} filters={filters} setPage={setPage} />
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
