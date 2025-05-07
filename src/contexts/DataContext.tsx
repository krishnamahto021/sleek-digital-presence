
import React, { createContext, useContext } from 'react';
import bioData from '../data/bio.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import { Bio, Project, Skill, Experience, Education } from '../types';

interface DataContextType {
  bio: Bio;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const value = {
    bio: bioData as Bio,
    projects: projectsData as Project[],
    skills: skillsData as Skill[],
    experience: experienceData as Experience[],
    education: educationData as Education[],
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
