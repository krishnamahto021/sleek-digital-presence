import React from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import {
  LocationOn as MapPinIcon,
  Email as MailIcon,
  Person as UserIcon,
  Terminal as TerminalIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  Avatar,
  Divider,
  Link,
} from "@mui/material";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const AboutSection = () => {
  const { bio, skills } = useData();

  // Extract top skills for display
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .map((skill) => skill.name);

  return (
    <Box
      component="section"
      id="about"
      sx={{
        bgcolor: "background.default",
        position: "relative",
        py: 8,
      }}
    >
      {/* Enhanced GitHub-themed Grid Background */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <FlickeringGrid
          useGithubTheme={true}
          maxOpacity={0.5}
          flickerChance={0.08}
          squareSize={6}
          gridGap={4}
        />
      </Box>

      {/* Code icons decoration */}
      <Box
        sx={{
          position: "absolute",
          right: 40,
          top: 96,
          opacity: 0.1,
          display: { xs: "none", md: "block" },
        }}
      >
        <TerminalIcon sx={{ fontSize: 120, opacity: 0.1 }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 40,
          bottom: 96,
          opacity: 0.1,
          display: { xs: "none", md: "block" },
        }}
      >
        <CodeIcon sx={{ fontSize: 120, opacity: 0.1 }} />
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
              background:
                "linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-light) 50%, var(--mui-palette-primary-dark) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
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

        <Grid container spacing={{ xs: 4, lg: 8 }} alignItems="center">
          {/* Photo with enhanced styling */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 400,
                    border: "1px solid",
                    borderColor: "primary.light",
                  }}
                >
                  <Box
                    component="img"
                    src={bio.photo}
                    alt={bio.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      aspectRatio: "4/3",
                    }}
                  />
                  <Box
                    sx={{
                      height: 8,
                      background:
                        "linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-light) 50%, var(--mui-palette-primary-dark) 100%)",
                    }}
                  />
                </Paper>
              </Box>
            </motion.div>
          </Grid>

          {/* Text Content with enhanced styling */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={2}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  p: 3,
                  border: "1px solid",
                  borderColor: "primary.light",
                }}
              >
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  Who I Am
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    lineHeight: 1.7,
                    color: "text.primary",
                  }}
                >
                  {bio.description}
                </Typography>

                {/* Contact Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MapPinIcon sx={{ fontSize: 18, color: "primary.main" }} />
                    <Typography variant="body2">{bio.location}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MailIcon sx={{ fontSize: 18, color: "primary.main" }} />
                    <Typography variant="body2">{bio.email}</Typography>
                  </Box>
                  {bio.socialLinks.map((link) => (
                    <Box
                      key={link.name}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <UserIcon sx={{ fontSize: 18, color: "primary.main" }} />
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "text.primary",
                          textDecoration: "none",
                          "&:hover": {
                            color: "primary.main",
                            textDecoration: "underline",
                          },
                          transition: "color 0.3s ease",
                        }}
                      >
                        <Typography variant="body2">{link.name}</Typography>
                      </Link>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Skills Tags */}
                <Box>
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      fontWeight: 500,
                      mb: 2,
                      color: "primary.dark",
                    }}
                  >
                    Top Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {topSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                          "&:hover": {
                            bgcolor: "primary.main",
                          },
                          border: "1px solid",
                          borderColor: "primary.main",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
