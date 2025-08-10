import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubmitButton from "./buttons/SubmitButton";

type ErrorType = {
  name: string;
  email: string;
  message: string;
};
const API_URL = import.meta.env.VITE_RENDER_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState<ErrorType>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {} as ErrorType;

    if (!formData.name.trim()) {
      newErrors.name = "• Name is required.";
    } else if (!/^[A-Za-z ,.'-]+$/.test(formData.name.trim())) {
      newErrors.name = "• Please enter a valid name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "• Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "• Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "• Message is required.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "• Message is too short.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run frontend validation first
    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_URL}/contact-form-validation.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        // Backend returned validation errors
        const backendErrors = {} as ErrorType;

        result.errors.forEach((err: string) => {
          if (err.toLowerCase().includes("name")) backendErrors.name = err;
          if (err.toLowerCase().includes("email")) backendErrors.email = err;
          if (err.toLowerCase().includes("message"))
            backendErrors.message = err;
        });

        setErrors(backendErrors);
        return;
      }

      alert(result.message || "Message sent!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
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
      {/* Heading */}
      <Typography
        color="#5b7553"
        variant="h1"
        fontSize={"3rem"}
        textTransform={"uppercase"}
        fontWeight={700}
        letterSpacing={1}
      >
        Contact
      </Typography>
      <Divider sx={{ maxWidth: 300 }} />
      <br />

      {/* Description text */}
      <Typography
        variant="body1"
        sx={{ fontFamily: "'Montserrat', sans-serif", mb: 2 }}
      >
        Have a question, feedback, or need help? Fill out the form below and
        we’ll get back to you as soon as possible. Your information will only be
        used to respond to your inquiry.
      </Typography>

      {/* Name */}
      <FormControl error={!!errors.name}>
        <TextField
          id="name-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-describedby="name-helper"
          label="Name"
          variant="outlined"
        />
        <FormHelperText id="name-helper">
          {errors.name || "Please enter your full name."}
        </FormHelperText>
      </FormControl>
      <br />

      {/* Email */}
      <FormControl error={!!errors.email}>
        <TextField
          id="email-input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby="email-helper"
          variant="outlined"
          label="Email"
          sx={{
            "& .MuiInputBase-input": {
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 100,
              backgroundColor: "white",
            },
            "& .MuiInputLabel-root": { fontFamily: "'Montserrat', sans-serif" },
            "& label.Mui-focused": { color: "#5b7553" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#5b7553a" },
              "&:hover fieldset": { borderColor: "#5b7553" },
              "&.Mui-focused fieldset": { borderColor: "#5b7553" },
            },
          }}
        />
        <FormHelperText id="email-helper">
          {errors.email || "We'll never share your email."}
        </FormHelperText>
      </FormControl>
      <br />

      {/* Message */}
      <FormControl error={!!errors.message}>
        <TextField
          id="message-input"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          aria-describedby="message-helper"
          variant="outlined"
          label="Message"
          sx={{
            "& .MuiInputBase-input": {
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 100,
              backgroundColor: "white",
            },
            "& .MuiInputLabel-root": { fontFamily: "'Montserrat', sans-serif" },
            "& label.Mui-focused": { color: "#5b7553" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#5b7553a" },
              "&:hover fieldset": { borderColor: "#5b7553" },
              "&.Mui-focused fieldset": { borderColor: "#5b7553" },
            },
          }}
        />
        <FormHelperText id="message-helper">
          {errors.message || "What would you like to tell us?"}
        </FormHelperText>
      </FormControl>
      <br />
      <SubmitButton />
    </Box>
  );
};

export default ContactForm;
