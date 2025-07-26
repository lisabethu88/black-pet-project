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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
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
      name: formData.name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    console.log("Form submitted:", formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxWidth: 500,
      }}
    >
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
      <FormControl error={!!errors.name}>
        <TextField
          id="name-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-describedby="name-helper"
          label="Name"
          variant="outlined"
          sx={{
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
          }}
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
                backgroundColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#5b7553",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5b7553",
              },
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
