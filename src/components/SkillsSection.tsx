import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkillsCube from "./SkillsCube";

const SkillsSection = () => {
  const { skills } = useData();
  const [category, setCategory] = useState("all");

  // Filter skills based on selected category
  const filteredSkills =
    category === "all"
      ? skills
      : skills.filter((skill) => skill.category === category);

  // Group skills by category for counting
  const frontendCount = skills.filter((s) => s.category === "frontend").length;
  const backendCount = skills.filter((s) => s.category === "backend").length;
  const toolsCount = skills.filter((s) => s.category === "tools").length;

  return (
    <section id="skills" className="bg-muted/40">
      <div className="container mx-auto">
        <h2 className="section-title">My Skills</h2>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                  Core Expertise
                </h3>
                <p className="text-foreground/80 mb-6">
                  I specialize in creating beautiful, functional, and
                  user-centered digital experiences. With a focus on modern
                  technologies, I build responsive and performant applications.
                </p>
                <p className="text-foreground/70 mb-6">
                  Interact with the 3D cube to explore my core skills!
                </p>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <SkillsCube />
              </motion.div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setCategory("all")}>
              All ({skills.length})
            </TabsTrigger>
            <TabsTrigger
              value="frontend"
              onClick={() => setCategory("frontend")}
            >
              Frontend ({frontendCount})
            </TabsTrigger>
            <TabsTrigger value="backend" onClick={() => setCategory("backend")}>
              Backend ({backendCount})
            </TabsTrigger>
            <TabsTrigger value="tools" onClick={() => setCategory("tools")}>
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
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
