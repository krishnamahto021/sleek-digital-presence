import React from "react";
import { Container, Box } from "@mui/material";
import { DataProvider } from "../contexts/DataContext";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ResumeSection from "../components/ResumeSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <DataProvider>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Navbar />
        <Box component="main" sx={{ position: "relative", flex: 1 }}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ResumeSection />
          <ContactSection />
        </Box>
        <Footer />
      </Box>
    </DataProvider>
  );
};

export default Index;
