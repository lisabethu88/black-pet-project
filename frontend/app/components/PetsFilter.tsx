import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  TextField,
} from "@mui/material";
import type { PetFilters } from "~/types";

interface PetsFilterProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filters: PetFilters;
  setFilters: React.Dispatch<React.SetStateAction<PetFilters>>;
}

const PetsFilter = ({ setPage, filters, setFilters }: PetsFilterProps) => {
  const handleChange =
    (field: keyof PetFilters) => (e: React.ChangeEvent<{ value: unknown }>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: e.target.value as string,
      }));
      setPage(1);
    };

  const [zipInput, setZipInput] = useState("");

  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type}
          label="Type"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="dog">Dog</MenuItem>
          <MenuItem value="cat">Cat</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={filters.gender}
          label="Gender"
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Age</InputLabel>
        <Select
          value={filters.age}
          label="Age"
          onChange={(e) => setFilters({ ...filters, age: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="baby">Baby</MenuItem>
          <MenuItem value="young">Young</MenuItem>
          <MenuItem value="adult">Adult</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={filters.sort}
          label="Sort"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="recent">Newest</MenuItem>
          <MenuItem value="-recent">Oldest</MenuItem>
          <MenuItem value="distance">Nearest</MenuItem>
        </Select>
      </FormControl>
      {filters.sort === "distance" && (
        <>
          <TextField
            label="Enter ZIP Code"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            required
          />
          <Button
            sx={{
              borderRadius: 2,
              color: "white",
              width: "fit-content",
              mr: 2,
              backgroundColor: "#5b7553",
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
            variant="outlined"
            onClick={() => {
              if (zipInput.length !== 5) {
                alert("Please enter a valid 5-digit ZIP code");
                return;
              }
              setFilters((prev) => ({
                ...prev,
                zip: zipInput,
              }));
              setPage(1);
            }}
          >
            Apply
          </Button>
        </>
      )}
    </Box>
  );
};

export default PetsFilter;
