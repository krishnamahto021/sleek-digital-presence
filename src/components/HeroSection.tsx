import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Link } from "react-scroll";
import { useData } from "../contexts/DataContext";
import HeroAnimation from "./HeroAnimation";
import WaveBackground from "./WaveBackground";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { bio } = useData();
  const [hoveredButton, setHoveredButton] = useState(null);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Button hover animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Wave background animation */}
      <WaveBackground />
      
      {/* Background gradient animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl">
            <motion.h2 
              className="text-lg md:text-xl mb-2 text-primary"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Hello, I'm
            </motion.h2>
            
            <motion.h1 
              className="text-hero font-bold mb-4"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {bio.name}
            </motion.h1>
            
            <motion.div
              className="overflow-hidden mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              >
                {bio.title}
              </motion.h2>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {bio.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredButton("cv")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button 
                  className="flex items-center gap-2 relative" 
                  asChild
                >
                  <a href={bio.resume} target="_blank" rel="noopener noreferrer">
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredButton === "cv" ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FileText size={18} />
                    </motion.span>
                    Download CV
                  </a>
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredButton("contact")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="contact" smooth={true} duration={500} offset={-70}>
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredButton === "contact" ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Mail size={18} />
                    </motion.span>
                    Contact Me
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with improved animation */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer group"
          >
            <motion.div 
              className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown size={24} className="text-primary" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
