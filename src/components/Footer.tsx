import React from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-scroll";
import { ArrowUp } from "lucide-react";
import {
  Box,
  Container,
  Typography,
  Fab,
  Stack,
  Link as MuiLink,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const { bio } = useData();
  const year = new Date().getFullYear();

  const navItems = ["About", "Projects", "Skills", "Resume", "Contact"];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        py: theme.spacing(4),
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Back to top button */}
          <Box sx={{ mb: theme.spacing(4) }}>
            <Link
              to="hero"
              smooth={true}
              duration={800}
              offset={-100}
              spy={true}
              isDynamic={true}
              ignoreCancelEvents={false}
              style={{ cursor: "pointer" }}
            >
              <Fab
                size="small"
                color="primary"
                sx={{
                  animation: "pulse 2s infinite",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  transition: `transform ${theme.custom.transitions.normal} ease`,
                }}
              >
                <ArrowUp size={20} />
              </Fab>
            </Link>
          </Box>

          <Typography
            variant="h4"
            component="h3"
            sx={{
              mb: theme.spacing(2),
              textAlign: "center",
            }}
          >
            {bio.name}
          </Typography>

          {/* Simple navigation */}
          <Stack
            direction="row"
            spacing={theme.spacing(2)}
            sx={{
              mb: theme.spacing(3),
              flexWrap: "wrap",
              justifyContent: "center",
              gap: theme.spacing(2),
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                isDynamic={true}
                ignoreCancelEvents={false}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <MuiLink
                  component="span"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                    },
                    transition: `color ${theme.custom.transitions.normal} ease`,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body1">{item}</Typography>
                </MuiLink>
              </Link>
            ))}
          </Stack>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            &copy; {year} {bio.name}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
