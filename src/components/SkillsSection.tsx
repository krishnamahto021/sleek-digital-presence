
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SkillsSection = () => {
  const { skills } = useData();
  const [category, setCategory] = useState('all');
  
  // Filter skills based on selected category
  const filteredSkills = category === 'all'
    ? skills
    : skills.filter(skill => skill.category === category);
  
  // Group skills by category for counting
  const frontendCount = skills.filter(s => s.category === 'frontend').length;
  const backendCount = skills.filter(s => s.category === 'backend').length;
  const toolsCount = skills.filter(s => s.category === 'tools').length;

  return (
    <section id="skills" className="bg-muted/50">
      <div className="container mx-auto">
        <h2 className="section-title">My Skills</h2>
        
        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="all"
              onClick={() => setCategory('all')}
            >
              All ({skills.length})
            </TabsTrigger>
            <TabsTrigger 
              value="frontend"
              onClick={() => setCategory('frontend')}
            >
              Frontend ({frontendCount})
            </TabsTrigger>
            <TabsTrigger 
              value="backend"
              onClick={() => setCategory('backend')}
            >
              Backend ({backendCount})
            </TabsTrigger>
            <TabsTrigger 
              value="tools"
              onClick={() => setCategory('tools')}
            >
              Tools ({toolsCount})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <SkillsGrid skills={filteredSkills} />
          </TabsContent>
          
          <TabsContent value="frontend" className="mt-6">
            <SkillsGrid skills={filteredSkills} />
          </TabsContent>
          
          <TabsContent value="backend" className="mt-6">
            <SkillsGrid skills={filteredSkills} />
          </TabsContent>
          
          <TabsContent value="tools" className="mt-6">
            <SkillsGrid skills={filteredSkills} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface SkillsGridProps {
  skills: {
    name: string;
    level: number;
    category: string;
    description: string;
  }[];
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <TooltipProvider key={skill.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="skill-card"
              >
                <div className="text-center">
                  <div className="mb-2 relative">
                    <div 
                      className="w-full bg-muted h-2 rounded-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <div 
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {skill.level}%
                    </span>
                  </div>
                  <h4 className="font-medium">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground capitalize">
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{skill.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default SkillsSection;
