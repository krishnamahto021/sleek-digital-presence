import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Tooltip,
  useTheme,
} from "@mui/material";

interface SkillsGridProps {
  skills: {
    name: string;
    level: number;
    category: string;
    description: string;
  }[];
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, md: 3 }}
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {skills.map((skill, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={skill.name}
          sx={{
            display: "flex",
          }}
        >
          <Tooltip title={skill.description} placement="top" arrow>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              viewport={{ once: true }}
              style={{ width: "100%" }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundImage: "none",
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  borderRadius: theme.custom.borderRadius.large,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px) scale(1.02)",
                    boxShadow: isDark
                      ? "0 10px 30px rgba(0,0,0,0.3)"
                      : "0 10px 25px rgba(0,0,0,0.15)",
                    borderColor: "primary.main",
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(255, 255, 255, 0.95)",
                    "& .skill-name": {
                      color: "primary.main",
                    },
                    "& .MuiLinearProgress-root": {
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.15)",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, sm: 2.5 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          background: isDark
                            ? `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`
                            : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 1,
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        transition: "color 0.3s ease",
                        color: "text.primary",
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                      }}
                    >
                      {skill.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        fontWeight: 500,
                        backgroundColor: isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {skill.category}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkillsGrid;
