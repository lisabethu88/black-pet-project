import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { v4 as uuidv4 } from "uuid";
import type { StoryType, FormErrors } from "~/types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SubmitStoryForm = () => {
  const API_URL = import.meta.env.VITE_RENDER_URL;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'info' | 'warning'
  });

  const [formData, setFormData] = useState<
    Omit<StoryType, "id" | "submitted_at" | "featured" | "status">
  >({
    pet_name: "",
    species: "",
    breed: "",
    title: "",
    body: "",
    image_url: "",
    author: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    pet_name: false,
    species: false,
    breed: false,
    title: false,
    body: false,
    image_url: false,
    author: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      pet_name: formData.pet_name.trim() === "",
      species: formData.species.trim() === "",
      breed: formData.breed?.trim() === "",
      title: formData.title.trim() === "",
      body: formData.body.trim() === "",
      image_url: formData.image_url.trim() === "",
      author: formData.author.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields.",
        severity: "error",
      });
      return;
    }

    const newStory: StoryType = {
      ...formData,
      id: uuidv4(),
      submitted_at: new Date().toISOString(),
      featured: false,
      status: "pending",
    };

    fetch(`${API_URL}/submit_story.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit story");
        return res.json();
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Thank you for sharing your story!",
          severity: "success",
        });
        setFormData({
          pet_name: "",
          species: "",
          breed: "",
          title: "",
          body: "",
          image_url: "",
          author: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({
          open: true,
          message: "Something went wrong. Please try again.",
          severity: "error",
        });
      });
  };

  const fieldStyles = {
    "& .MuiInputBase-input": {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 100,
      backgroundColor: "white",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 100,
    },
    "& label.Mui-focused": {
      color: "#5b7553",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 100,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5b7553a",
      },
      "&:hover fieldset": {
        borderColor: "#5b7553",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5b7553",
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxWidth: 600,
        padding: 1,
      }}
    >
      <Typography
        color="#5b7553"
        variant="h1"
        fontSize={"2.5rem"}
        textTransform={"uppercase"}
        fontWeight={700}
        letterSpacing={1}
      >
        Submit Story
      </Typography>
      <Divider sx={{ maxWidth: 300, mb: 3 }} />

      {[
        {
          label: "Pet's Name",
          name: "pet_name",
          helper: "Enter your pet's name.",
        },
        {
          label: "Species",
          name: "species",
          helper: "e.g. Dog",
        },
        {
          label: "Breed",
          name: "breed",
          helper: "e.g. Lab mix",
        },
        {
          label: "Story Title",
          name: "title",
          helper: "Give your story a title.",
        },
        {
          label: "Image URL",
          name: "image_url",
          helper: "Link to an image of your pet.",
        },
        { label: "Author Name", name: "author", helper: "Your full name." },
      ].map((field) => (
        <Box key={field.name} mb={2}>
          <FormControl
            fullWidth
            error={!!errors[field.name as keyof typeof errors]}
          >
            <TextField
              {...field}
              value={formData[field.name as keyof typeof formData] ?? ""}
              onChange={handleChange}
              name={field.name}
              variant="outlined"
              sx={fieldStyles}
            />
            <FormHelperText>
              {errors[field.name as keyof typeof errors]
                ? "This field is required."
                : field.helper}
            </FormHelperText>
          </FormControl>
        </Box>
      ))}

      <FormControl fullWidth error={!!errors.body}>
        <TextField
          name="body"
          label="Your Story"
          value={formData.body || ""}
          onChange={handleChange}
          multiline
          rows={6}
          variant="outlined"
          sx={fieldStyles}
        />
        <FormHelperText>
          {errors.body || "Tell us how your black pet changed your life!"}
        </FormHelperText>
      </FormControl>

      <Box mt={3}>
        <SubmitButton />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubmitStoryForm;
