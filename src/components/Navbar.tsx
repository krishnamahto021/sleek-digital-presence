import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import { useData } from "../contexts/DataContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const { bio } = useData();
  const [isOpen, setIsOpen] = useState(false);

  // Use MUI's scroll trigger for better performance
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const navLinks = [
    { title: "About", to: "about" },
    { title: "Projects", to: "projects" },
    { title: "Skills", to: "skills" },
    { title: "Resume", to: "resume" },
    { title: "Contact", to: "contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: trigger
          ? `${muiTheme.palette.background.paper}dd`
          : "transparent",
        backdropFilter: trigger ? "blur(10px)" : "none",
        boxShadow: trigger ? 1 : 0,
        transition: "all 0.3s ease",
        py: trigger ? 0 : 1,
        borderBottom: trigger
          ? `1px solid ${muiTheme.palette.divider}`
          : "none",
        // Full width, no margins, no border radius
        width: "100%",
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Logo/Name */}
        <Link
          to="hero"
          smooth={true}
          duration={800}
          offset={-100}
          spy={true}
          isDynamic={true}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: muiTheme.palette.text.primary,
              "&:hover": { color: muiTheme.palette.primary.main },
              transition: "color 0.3s ease",
              cursor: "pointer",
            }}
          >
            {bio.name.split(" ")[0]}
            <Box component="span" sx={{ color: "primary.main" }}>
              .
            </Box>
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={800}
              className="nav-link"
              activeClass="active"
              isDynamic={true}
              ignoreCancelEvents={false}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: muiTheme.palette.text.primary,
                  "&:hover": {
                    color: muiTheme.palette.primary.main,
                  },
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {link.title}
              </Typography>
            </Link>
          ))}

          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 1,
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
              cursor: "pointer",
            }}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
        </Box>

        {/* Mobile Menu Controls */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            sx={{
              mr: 1,
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
              cursor: "pointer",
            }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>

          <IconButton
            onClick={toggleMenu}
            aria-label="Toggle menu"
            sx={{
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
              cursor: "pointer",
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Box>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="top"
          open={isOpen}
          onClose={closeMenu}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor: muiTheme.palette.background.paper,
              backdropFilter: "blur(10px)",
              borderBottom: `1px solid ${muiTheme.palette.divider}`,
              // Full width mobile menu, no margins, no border radius, no top gap
              left: "0 !important",
              right: "0 !important",
              width: "100% !important",
              top: { xs: "56px !important", sm: "64px !important" }, // Tight positioning under navbar
              borderRadius: "0 !important",
              marginTop: "0 !important",
            },
          }}
        >
          <List sx={{ px: { xs: 2, sm: 3 } }}>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton
                  onClick={closeMenu}
                  sx={{
                    py: 2,
                    px: { xs: 2, sm: 3 },
                    "&:hover": {
                      backgroundColor: muiTheme.palette.action.hover,
                      "& .MuiListItemText-primary": {
                        color: muiTheme.palette.primary.main,
                      },
                    },
                    cursor: "pointer",
                  }}
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={800}
                    activeClass="text-primary"
                    isDynamic={true}
                    ignoreCancelEvents={false}
                    style={{
                      width: "100%",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText
                      primary={link.title}
                      primaryTypographyProps={{
                        variant: "h6",
                        fontWeight: 500,
                        color: muiTheme.palette.text.primary,
                        sx: { cursor: "pointer" },
                      }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
