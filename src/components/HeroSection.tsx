import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  KeyboardArrowDown as ArrowDownIcon,
  Description as FileTextIcon,
  Email as MailIcon,
  Rocket as RocketIcon,
} from "@mui/icons-material";
import { Link } from "react-scroll";
import { useData } from "../contexts/DataContext";
import {
  Box,
  Container,
  Typography,
  Fab,
  Stack,
  Button,
  useTheme,
} from "@mui/material";

import WaveBackground from "./WaveBackground";
import Shape3D from "./Shape3D";

const HeroSection = () => {
  const theme = useTheme();
  const { bio } = useData();
  const [hoveredButton, setHoveredButton] = useState(null);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Button hover animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Wave background */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}>
        <WaveBackground />
      </Box>

      {/* 3D Shapes - Left Side */}
      <Shape3D
        position="left-[5%]  top-[10%]"
        color="primary"
        delay={0}
        shape="cube"
      />
      <Shape3D
        position="left-[15%]  top-[25%]"
        color="secondary"
        delay={1.5}
        shape="pyramid"
      />
      <Shape3D
        position="left-[8%] top-[80%]"
        color="primary"
        delay={0.8}
        shape="donut"
      />

      {/* 3D Shapes - Right Side */}
      <Shape3D
        position="right-[6%] top-[10%]"
        color="secondary"
        delay={0.5}
        shape="sphere"
      />
      <Shape3D
        position="right-[10%] top-[25%]"
        color="primary"
        delay={1.2}
        shape="cube"
      />
      <Shape3D
        position="right-[14%] top-[80%]"
        color="secondary"
        delay={0.3}
        shape="triangle"
      />

      {/* Background gradient overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(to bottom, rgba(15,20,25,0.85), rgba(15,20,25,0.6), rgba(15,20,25,0.85))"
              : "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.4), rgba(255,255,255,0.7))",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 10,
          py: theme.custom.sectionSpacing.mobile,
          [theme.breakpoints.up("md")]: {
            py: theme.custom.sectionSpacing.desktop,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "default",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1),
              marginBottom: theme.spacing(2),
            }}
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <RocketIcon
              sx={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 500,
              }}
            >
              MVP Specialist
            </Typography>
            <RocketIcon
              sx={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                background: theme.custom.gradients.primary,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              {bio.name}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ overflow: "hidden", marginBottom: theme.spacing(4) }}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: "primary.main",
                  background: "none", // Override the h2 gradient from theme
                  backgroundClip: "unset",
                  WebkitBackgroundClip: "unset",
                  WebkitTextFillColor: "unset",
                  textAlign: "center",
                }}
              >
                Full Stack Developer
              </Typography>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
                mb: 4,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              {bio.shortDescription}
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ width: "100%" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 400,
                mx: "auto",
              }}
            >
              <motion.div
                style={{ width: "100%" }}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredButton("view-work")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Link
                  to="projects"
                  smooth={true}
                  duration={800}
                  offset={-80}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FileTextIcon />}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: 180 },
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: theme.custom.borderRadius.medium,
                      background: theme.custom.gradients.primary,
                      "&:hover": {
                        background: theme.custom.gradients.primary,
                        opacity: 0.9,
                      },
                    }}
                  >
                    View My Work
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                style={{ width: "100%" }}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredButton("get-in-touch")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Link
                  to="contact"
                  smooth={true}
                  duration={800}
                  offset={-80}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<MailIcon />}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: 180 },
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: theme.custom.borderRadius.medium,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </Stack>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              position: "absolute",
              bottom: theme.spacing(4),
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Link
              to="about"
              smooth={true}
              duration={800}
              offset={-80}
              style={{ cursor: "pointer" }}
            >
              <Fab
                size="small"
                sx={{
                  backgroundColor: "background.paper",
                  color: "primary.main",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              >
                <ArrowDownIcon />
              </Fab>
            </Link>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
