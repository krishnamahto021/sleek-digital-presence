import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme as useMuiTheme,
} from "@mui/material";
import SkillsCube from "./SkillsCube";
import SkillsGrid from "./SkillsGrid";
import { useTheme } from "../contexts/ThemeContext";

const SkillsSection = () => {
  const { skills } = useData();
  const [category, setCategory] = useState(0); // 0 = all, 1 = frontend, 2 = backend
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === "dark";

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (category === 0) return skills; // all
    if (category === 1)
      return skills.filter((skill) => skill.category === "frontend");
    if (category === 2)
      return skills.filter((skill) => skill.category === "backend");
    return skills;
  }, [skills, category]);

  // Group skills by category for counting
  const frontendCount = skills.filter((s) => s.category === "frontend").length;
  const backendCount = skills.filter((s) => s.category === "backend").length;

  // Define star background styles based on theme
  const starsStyle = {
    backgroundImage: isDark
      ? `radial-gradient(1px 1px at 20px 30px, ${muiTheme.palette.primary.light}, rgba(0,0,0,0)),
         radial-gradient(1px 1px at 40px 70px, ${muiTheme.palette.primary.main}, rgba(0,0,0,0)),
         radial-gradient(1px 1px at 50px 160px, ${muiTheme.palette.secondary.light}, rgba(0,0,0,0)),
         radial-gradient(1px 1px at 90px 40px, ${muiTheme.palette.primary.light}, rgba(0,0,0,0)),
         radial-gradient(1px 1px at 130px 80px, ${muiTheme.palette.primary.main}, rgba(0,0,0,0)),
         radial-gradient(1px 1px at 160px 120px, ${muiTheme.palette.secondary.light}, rgba(0,0,0,0))`
      : `radial-gradient(2px 2px at 20px 30px, ${muiTheme.palette.primary.main}, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 40px 70px, ${muiTheme.palette.secondary.main}, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 50px 160px, ${muiTheme.palette.primary.light}, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 90px 40px, ${muiTheme.palette.primary.main}, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 130px 80px, ${muiTheme.palette.secondary.main}, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 160px 120px, ${muiTheme.palette.primary.light}, rgba(0,0,0,0))`,
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    animation: "twinkle 5s ease-in-out infinite",
    opacity: isDark ? 0.4 : 0.2,
  };

  // Create CSS for the twinkle animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes twinkle {
        0% { opacity: ${isDark ? 0.4 : 0.2}; }
        50% { opacity: ${isDark ? 0.7 : 0.4}; }
        100% { opacity: ${isDark ? 0.4 : 0.2}; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDark]);

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background with stars */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(96,165,250,0.1) 0%, rgba(0,0,0,0) 80%)"
              : "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 80%)",
          }}
        />
        <Box
          className="stars"
          sx={{ position: "absolute", inset: 0 }}
          style={starsStyle}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: "bold",
              mb: 1,
              color: "primary.main",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            My Skills
          </Typography>
          <Box
            sx={{
              height: 4,
              width: 80,
              bgcolor: "primary.main",
              mx: "auto",
              borderRadius: 2,
            }}
          />
        </Box>

        <Box sx={{ maxWidth: "80rem", mx: "auto", mb: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { md: "50%" },
                order: { xs: 2, md: 1 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    fontSize: { xs: "1.5rem", md: "1.875rem" },
                    background: muiTheme.custom.gradients.primary,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Core Expertise
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    lineHeight: 1.7,
                  }}
                >
                  I specialize in creating beautiful, functional, and
                  user-centered digital experiences. With a focus on modern
                  technologies, I build responsive and performant applications.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    mb: 3,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  Interact with the 3D cube to explore my core skills!
                </Typography>
              </motion.div>
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: { md: "50%" },
                order: { xs: 1, md: 2 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <SkillsCube />
              </motion.div>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ position: "relative", maxWidth: "112rem", mx: "auto", pb: 6 }}
        >
          <Box sx={{ px: 2 }}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "transparent",
                borderRadius: 2,
              }}
            >
              <Tabs
                value={category}
                onChange={(_, newValue) => setCategory(newValue)}
                variant="fullWidth"
                sx={{
                  mb: 3,
                  "& .MuiTabs-indicator": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <Tab
                  label={`All (${skills.length})`}
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                />
                <Tab
                  label={`Frontend (${frontendCount})`}
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                />
                <Tab
                  label={`Backend (${backendCount})`}
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                />
              </Tabs>

              <Box sx={{ mt: 3 }}>
                <SkillsGrid skills={filteredSkills} />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SkillsSection;
