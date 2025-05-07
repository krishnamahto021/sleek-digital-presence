
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { MapPin, Mail, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AboutSection = () => {
  const { bio, skills } = useData();
  
  // Extract top skills for display
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .map(skill => skill.name);

  return (
    <section id="about" className="bg-muted/50">
      <div className="container mx-auto">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="rounded-xl overflow-hidden w-full max-w-md shadow-lg">
              <img
                src={bio.photo}
                alt={bio.name}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="mb-6">{bio.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-primary"/>
                <span>{bio.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-primary"/>
                <span>{bio.email}</span>
              </div>
              {bio.socialLinks.map(link => (
                <div key={link.name} className="flex items-center space-x-2">
                  <User size={18} className="text-primary"/>
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
              <h4 className="text-lg font-medium mb-3">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
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
