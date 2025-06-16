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

  return (
    <Grid container spacing={2}>
      {skills.map((skill, index) => (
        <Grid item xs={12} sm={6} lg={4} key={skill.name}>
          <Tooltip title={skill.description} placement="top" arrow>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card
                className="skill-card"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[4],
                    "& .skill-name": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": {
                          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 1,
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    className="skill-name"
                    sx={{
                      fontWeight: 500,
                      mb: 0.5,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {skill.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "0.75rem",
                    }}
                  >
                    {skill.category}
                  </Typography>
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
