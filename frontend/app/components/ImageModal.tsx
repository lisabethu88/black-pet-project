import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";
type ImageModalProps = {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
};
const ImageModal = ({ open, onClose, imageUrl, alt }: ImageModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 2,
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageModal;
