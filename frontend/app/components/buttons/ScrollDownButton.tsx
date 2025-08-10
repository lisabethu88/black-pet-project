import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";

const sections = [
  "#hero-banner",
  "#black-dog-syndrome",
  "#featured-stories",
  "#recent-pets",
];

const ScrollDownButton = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setAtBottom(scrollY + windowHeight >= documentHeight - 5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const currentScroll = window.scrollY;
      const nextSection = sections.find((id) => {
        const el = document.querySelector(id);
        return (
          el &&
          el.getBoundingClientRect().top + window.scrollY > currentScroll + 10
        );
      });

      if (nextSection) {
        const el = document.querySelector(nextSection);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: 75,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        color: "#5b7553",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        transition: "all 0.3s ease-out",
        "&:hover": {
          backgroundColor: "white",
        },
      }}
    >
      <KeyboardArrowDownIcon
        fontSize="large"
        sx={{ transform: atBottom ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </IconButton>
  );
};

export default ScrollDownButton;
