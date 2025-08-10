import { Box, Link, Typography, Stack, type SvgIconProps } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import PrimaryButton from "./buttons/PrimaryButton";
import { motion } from "motion/react";
const FeatureItem = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  subtitle: string;
}) => (
  <Stack direction="row" spacing={2} alignItems="flex-start" mb={3}>
    <Icon sx={{ color: "white", fontSize: 28, mt: 0.5 }} />
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" color="white">
        {title}
      </Typography>
      <Typography variant="body2" color="grey.300">
        {subtitle}
      </Typography>
    </Box>
  </Stack>
);
const BlackDogSyndrome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingX: 5,
        paddingY: 10,
        gap: 10,
      }}
    >
      {/* Section 1 */}
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            gutterBottom
            fontFamily="'Radley', serif"
            textAlign={{ xs: "center", md: "left" }}
            color="white"
          >
            What is Black Dog Syndrome?
          </Typography>
          <Typography
            variant="body1"
            color="white"
            maxWidth="sm"
            mx={{ xs: "auto", md: 0 }}
            sx={{
              "&::first-letter": {
                fontSize: "2.5rem",
                float: "left",
                lineHeight: 1,
                paddingRight: "0.1em",
                fontWeight: "bold",
                fontFamily: "'Radley', serif",
              },
            }}
          >
            Black Dog Syndrome is a term used to describe the unfortunate
            reality that black pets are often overlooked in shelters. Studies
            and shelter reports have shown that pets with darker fur tend to
            wait longer to be adopted than their lighter-colored counterparts.
            This can be due to outdated superstitions, negative media
            portrayals, or even something as simple as how difficult it can be
            to photograph dark-furred animals in shelter lighting.
          </Typography>{" "}
          <br />
          <Typography
            variant="body1"
            color="white"
            maxWidth="sm"
            mx={{ xs: "auto", md: 0 }}
            sx={{
              "&::first-letter": {
                fontSize: "2.5rem",
                float: "left",
                lineHeight: 1,
                paddingRight: "0.1em",
                fontWeight: "bold",
                fontFamily: "'Radley', serif",
              },
            }}
          >
            This website was created to help change that. Our goal is to shine a
            spotlight on these amazing pets by showing how loving, beautiful,
            and special they truly are. Black pets are just as playful, loyal,
            goofy, gentle, and full of personality as any other animal. By
            sharing their stories, showcasing their adorable faces, and
            providing resources for adopters, we hope to change perceptions and
            help more black pets find the forever homes they deserve. Every pet
            deserves a chance.
            <Link
              target="_blank"
              sx={{
                marginLeft: 1,
                fontWeight: "bold",
                color: "white",
                "--Link-underlineColor": "white",
              }}
              href="https://en.wikipedia.org/wiki/Black_dog_syndrome"
            >
              Learn More
            </Link>
          </Typography>
        </Box>{" "}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            variants={{
              offscreen: {
                opacity: 0,
                x: 30,
              },
              onscreen: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
          >
            <Box
              component="img"
              src="/public/bd-art-1.png"
              alt="Black dog behind cage"
              sx={{
                width: "100%",
                objectFit: "cover",
                borderRadius: 0,
                zIndex: 0,
                maxWidth: 300,
                marginTop: 5,
              }}
            />
          </motion.div>
        </motion.div>
      </Box>
      {/* Section 2 */}{" "}
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap-reverse", md: "nowrap" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {" "}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            variants={{
              offscreen: {
                opacity: 0,
                x: -30,
              },
              onscreen: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
          >
            <Box
              component="img"
              src="/bd-art-2.png"
              alt="Black dog behind cage"
              sx={{
                width: "100%",
                objectFit: "cover",
                borderRadius: 0,
                zIndex: 2,
                maxWidth: 300,
                marginTop: 5,
              }}
            />
          </motion.div>
        </motion.div>
        <Box>
          <Typography
            variant="h3"
            gutterBottom
            fontFamily="'Radley', serif"
            color="white"
            textAlign={{ xs: "center", md: "left" }}
          >
            Why{" "}
            <span className="circled-text">
              You <img id="circle-img" src="/circle.png"></img>
            </span>{" "}
            Should Adopt a Black Pet{" "}
          </Typography>
          <FeatureItem
            icon={PetsIcon}
            title="Graceful & Mysterious"
            subtitle="Black cats are elegant, sleek, and full of personality."
          />
          <FeatureItem
            icon={FavoriteIcon}
            title="Loyal & Loving"
            subtitle="Black dogs are affectionate and devoted companions."
          />
          <FeatureItem
            icon={VisibilityIcon}
            title="Unique & Overlooked"
            subtitle="Black pets are often passed over due to old myths."
          />
          <FeatureItem
            icon={StarIcon}
            title="Beauty in Every Shade"
            subtitle="Shiny fur and soulful eyes make them truly stunning."
          />
          <FeatureItem
            icon={HomeIcon}
            title="Second Chances Matter"
            subtitle="Adopting a black pet gives them the love they deserve."
          />
          <PrimaryButton
            path={"/pets"}
            buttonText={"Find a pet"}
          ></PrimaryButton>
          
        </Box>{" "}
      </Box>
    </Box>
  );
};

export default BlackDogSyndrome;
