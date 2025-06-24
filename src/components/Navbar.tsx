import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  DarkMode as MoonIcon,
  LightMode as SunIcon,
} from "@mui/icons-material";
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
  Button,
} from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import { useData } from "../contexts/DataContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const { bio } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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
              activeClass="active"
              isDynamic={true}
              ignoreCancelEvents={false}
              onSetActive={() => setActiveSection(link.to)}
              style={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  borderRadius: muiTheme.custom.borderRadius.medium,
                  transition: "all 0.3s ease",
                  color: muiTheme.palette.text.primary,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 500,
                  position: "relative",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.action.hover,
                    color: muiTheme.palette.primary.main,
                  },
                  // Active state styling
                  ...(activeSection === link.to && {
                    color: muiTheme.palette.primary.main,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "50%",
                      height: 2,
                      backgroundColor: muiTheme.palette.primary.main,
                      borderRadius: 9999,
                    },
                  }),
                }}
              >
                {link.title}
              </Button>
            </Link>
          ))}

          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 1,
              padding: "8px 16px",
              borderRadius: muiTheme.custom.borderRadius.medium,
              minWidth: 48,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
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
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
              cursor: "pointer",
            }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>

          <IconButton
            onClick={toggleMenu}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              width: 44,
              height: 44,
              borderRadius: muiTheme.custom.borderRadius.medium,
              color: muiTheme.palette.text.primary,
              "&:hover": {
                backgroundColor: muiTheme.palette.action.hover,
                color: muiTheme.palette.primary.main,
              },
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={closeMenu}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 280,
              backgroundColor: muiTheme.palette.background.paper,
              backdropFilter: "blur(20px)",
              borderLeft: `1px solid ${muiTheme.palette.divider}`,
            },
          }}
        >
          <Box
            sx={{
              pt: 2,
              pb: 1,
              px: 2,
              borderBottom: `1px solid ${muiTheme.palette.divider}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: muiTheme.palette.text.primary,
                textAlign: "center",
              }}
            >
              {bio.name.split(" ")[0]}
              <Box component="span" sx={{ color: "primary.main" }}>
                .
              </Box>
            </Typography>
          </Box>

          <List sx={{ px: 1, py: 2 }}>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <Link
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  spy={true}
                  isDynamic={true}
                  ignoreCancelEvents={false}
                  onSetActive={() => setActiveSection(link.to)}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={closeMenu}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: muiTheme.custom.borderRadius.medium,
                      mx: 1,
                      my: 0.5,
                      "&:hover": {
                        backgroundColor: muiTheme.palette.action.hover,
                      },
                      // Active state
                      ...(activeSection === link.to && {
                        backgroundColor: muiTheme.palette.primary.light + "20",
                        color: muiTheme.palette.primary.main,
                      }),
                    }}
                  >
                    <ListItemText
                      primary={link.title}
                      primaryTypographyProps={{
                        fontWeight: activeSection === link.to ? 600 : 500,
                        color:
                          activeSection === link.to
                            ? muiTheme.palette.primary.main
                            : muiTheme.palette.text.primary,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
