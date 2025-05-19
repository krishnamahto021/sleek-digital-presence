import React, { useState, useMemo, useRef, useEffect } from "react";
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
import Enhanced3DEffects from "./Enhanced3DEffects";

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

  return (
    <section id="skills" className="bg-muted/40 relative overflow-hidden">
      {/* Full-screen background with particle effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Enhanced3DEffects
          height="100%"
          interactive={false}
          showParticles={true}
          showPanels={false}
        />
      </div>

      <div className="container mx-auto relative z-10">
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

        <div className="relative max-w-7xl mx-auto pb-12">
          {/* For larger screens: 3 column layout with 3D effects on sides */}

          {/* Tabs in the middle */}
          <div className="px-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all" onClick={() => setCategory("all")}>
                  All ({skills.length})
                </TabsTrigger>
                <TabsTrigger
                  value="frontend"
                  onClick={() => setCategory("frontend")}
                >
                  Frontend ({frontendCount})
                </TabsTrigger>
                <TabsTrigger
                  value="backend"
                  onClick={() => setCategory("backend")}
                >
                  Backend ({backendCount})
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
            </Tabs>
          </div>
        </div>

        {/* For mobile: Just tabs and content */}
        <div className="md:hidden px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" onClick={() => setCategory("all")}>
                All ({skills.length})
              </TabsTrigger>
              <TabsTrigger
                value="frontend"
                onClick={() => setCategory("frontend")}
              >
                Frontend ({frontendCount})
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                onClick={() => setCategory("backend")}
              >
                Backend ({backendCount})
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
          </Tabs>

          {/* Small 3D effect for mobile */}
          <div className="mt-8 h-[200px]">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="h-full w-full rounded-lg overflow-hidden border border-primary/10 shadow-md"
            >
              <Enhanced3DEffects
                height="100%"
                interactive={true}
                showParticles={true}
                showPanels={true}
                className="dark:bg-slate-900/80 bg-slate-100/80"
              />
            </motion.div>
          </div>
        </div>
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
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <TooltipProvider key={skill.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="skill-card bg-card/30 dark:bg-card/20 backdrop-blur-sm p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md"
              >
                <div className="text-center">
                  <div className="mb-3 relative">
                    <div
                      className="w-full bg-muted dark:bg-muted/50 h-2 rounded-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {skill.level}%
                    </span>
                  </div>
                  <h4 className="font-medium text-lg">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground capitalize mt-1">
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
