
import React from 'react';
import { DataProvider } from '../contexts/DataContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ResumeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
};

export default Index;
