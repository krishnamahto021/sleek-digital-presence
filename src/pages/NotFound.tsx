import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{ fontSize: "2.5rem", fontWeight: "bold", mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ color: "grey.600", mb: 2 }}>
          Oops! Page not found
        </Typography>
        <Link
          href="/"
          sx={{
            color: "primary.main",
            "&:hover": { color: "primary.dark" },
            textDecoration: "underline",
          }}
        >
          Return to Home
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
