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
import SkillsGrid from "./SkillsGrid";
import { useTheme } from "next-themes";

const SkillsSection = () => {
  const { skills } = useData();
  const [category, setCategory] = useState("all");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Filter skills based on selected category
  const filteredSkills =
    category === "all"
      ? skills
      : skills.filter((skill) => skill.category === category);

  // Group skills by category for counting
  const frontendCount = skills.filter((s) => s.category === "frontend").length;
  const backendCount = skills.filter((s) => s.category === "backend").length;

  // Define star background styles based on theme
  const starsStyle = {
    backgroundImage: isDark
      ? `radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
         radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))`
      : `radial-gradient(3px 3px at 20px 30px, #333, rgba(0,0,0,0)),
         radial-gradient(3px 3px at 40px 70px, #444, rgba(0,0,0,0)),
         radial-gradient(3px 3px at 50px 160px, #222, rgba(0,0,0,0)),
         radial-gradient(3px 3px at 90px 40px, #333, rgba(0,0,0,0)),
         radial-gradient(3px 3px at 130px 80px, #222, rgba(0,0,0,0)),
         radial-gradient(3px 3px at 160px 120px, #111, rgba(0,0,0,0))`,
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    animation: "twinkle 5s ease-in-out infinite",
    opacity: isDark ? 0.6 : 0.3,
  };

  // Create CSS for the twinkle animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes twinkle {
        0% { opacity: ${isDark ? 0.6 : 0.3}; }
        50% { opacity: ${isDark ? 0.9 : 0.6}; }
        100% { opacity: ${isDark ? 0.6 : 0.3}; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDark]);

  return (
    <section
      id="skills"
      className="bg-background/90 dark:bg-muted/20 relative overflow-hidden"
    >
      {/* Background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0)_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" style={starsStyle} />
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
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
