import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
                className="skill-card backdrop-blur-sm p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md hover:scale-105 group"
                style={{
                  background: "rgba(var(--card), 0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-center">
                  <div className="mb-3 relative overflow-hidden rounded-full">
                    <div
                      className="w-full bg-muted/30 dark:bg-muted/20 h-2 rounded-full"
                      aria-hidden="true"
                    >
                      <motion.div
                        className="bg-gradient-to-r from-primary/80 to-secondary h-full rounded-full relative"
                        style={{ width: `${skill.level}%` }}
                        whileHover={{
                          boxShadow: "0 0 12px 2px rgba(var(--primary), 0.3)",
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {skill.level}%
                    </span>
                  </div>
                  <h4 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-muted-foreground capitalize mt-1">
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{skill.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default SkillsGrid;
