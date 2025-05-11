
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { useData } from '../contexts/DataContext';
import ThreeDHero from './ThreeDHero';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { bio } = useData();

  return (
    <section id="hero" className="min-h-screen flex items-center relative">
      {/* 3D Background */}
      <ThreeDHero />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg md:text-xl mb-2 text-primary">Hello, I'm</h2>
            <h1 className="text-hero font-bold mb-4">{bio.name}</h1>
            <h2 className="text-2xl md:text-3xl mb-6">{bio.title}</h2>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {bio.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="flex items-center gap-2" asChild>
              <a href={bio.resume} target="_blank" rel="noopener noreferrer">
                <FileText size={18} />
                Download CV
              </a>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <Link to="contact" smooth={true} duration={500} offset={-70}>
                <Mail size={18} />
                Contact Me
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
        >
          <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer">
            <ArrowDown size={24} className="text-primary" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
