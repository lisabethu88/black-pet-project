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

export type StoryType = {
  id: string;
  petName: string;
  speciesBreed: string;
  title: string;
  body: string;
  imageUrl: string;
  author: string;
  submittedAt: string;
  status: "pending" | "approved";
  featured?: boolean;
};

const SubmitStoryForm = () => {
  const [formData, setFormData] = useState<
    Omit<StoryType, "id" | "submittedAt" | "status">
  >({
    petName: "",
    speciesBreed: "",
    title: "",
    body: "",
    imageUrl: "",
    author: "",
  });

  const [errors, setErrors] = useState({
    petName: false,
    speciesBreed: false,
    title: false,
    body: false,
    imageUrl: false,
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
      petName: formData.petName.trim() === "",
      speciesBreed: formData.speciesBreed.trim() === "",
      title: formData.title.trim() === "",
      body: formData.body.trim() === "",
      imageUrl: formData.imageUrl.trim() === "",
      author: formData.author.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const newStory: StoryType = {
      ...formData,
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    console.log("Story submitted:", newStory);
    alert("Thank you for sharing your story!");

    // Reset form
    setFormData({
      petName: "",
      speciesBreed: "",
      title: "",
      body: "",
      imageUrl: "",
      author: "",
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
          name: "petName",
          helper: "Enter your pet's name.",
        },
        {
          label: "Species & Breed",
          name: "speciesBreed",
          helper: "e.g. Dog - Lab mix",
        },
        {
          label: "Story Title",
          name: "title",
          helper: "Give your story a title.",
        },
        {
          label: "Image URL",
          name: "imageUrl",
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
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              name={field.name}
              variant="outlined"
              sx={fieldStyles}
            />
            <FormHelperText>
              {errors[field.name as keyof typeof errors] || field.helper}
            </FormHelperText>
          </FormControl>
        </Box>
      ))}

      <FormControl fullWidth error={!!errors.body}>
        <TextField
          name="body"
          label="Your Story"
          value={formData.body}
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
        <SubmitButton handler={handleSubmit} />
      </Box>
    </Box>
  );
};

export default SubmitStoryForm;
