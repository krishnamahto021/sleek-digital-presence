import React from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import { MapPin, Mail, User, Terminal, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const AboutSection = () => {
  const { bio, skills } = useData();

  // Extract top skills for display
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .map((skill) => skill.name);

  return (
    <section id="about" className="bg-muted/50 relative py-16">
      {/* Enhanced GitHub-themed Grid Background */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          useGithubTheme={true}
          maxOpacity={0.5}
          flickerChance={0.08}
          squareSize={6}
          gridGap={4}
        />
      </div>

      {/* Code icons decoration */}
      <div className="absolute right-10 top-24 opacity-10 hidden md:block">
        <Terminal size={120} strokeWidth={1} />
      </div>
      <div className="absolute left-10 bottom-24 opacity-10 hidden md:block">
        <Code size={120} strokeWidth={1} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
            About Me
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Photo with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="rounded-xl overflow-hidden w-full max-w-md shadow-lg border border-primary/10">
              <img
                src={bio.photo}
                alt={bio.name}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/20"></div>
            </div>
          </motion.div>

          {/* Text Content with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">Who I Am</h3>
            <p className="mb-6 leading-relaxed">{bio.description}</p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-primary" />
                <span>{bio.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-primary" />
                <span>{bio.email}</span>
              </div>
              {bio.socialLinks.map((link) => (
                <div key={link.name} className="flex items-center space-x-2">
                  <User size={18} className="text-primary" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-primary/90">
                Top Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm font-medium bg-primary/10 hover:bg-primary/20 border border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
