import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail, Rocket } from "lucide-react";
import { Link } from "react-scroll";
import { useData } from "../contexts/DataContext";

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
        ease: "easeOut",
      },
    }),
  };

  // Button hover animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Wave background animation - increased opacity and z-index */}
      <div className="absolute inset-0 z-0 opacity-60">
        <WaveBackground />
      </div>

      {/* Background gradient animation - adjusted for better wave visibility */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background/70 to-background/50 z-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            className="flex items-center gap-2 text-primary mb-4"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Rocket size={20} className="animate-pulse" />
            <span className="text-lg md:text-xl font-medium">
              MVP Specialist
            </span>
            <Rocket size={20} className="animate-pulse" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {bio.name}
          </motion.h1>

          <motion.div
            className="overflow-hidden mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <span className="text-primary">Full Stack Developer</span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed mx-auto font-medium"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Crafting elegant MVPs that turn ideas into reality, fast.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 justify-center"
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
                className="flex items-center gap-2 relative text-base"
                size="lg"
                asChild
              >
                <a href={bio.resume} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredButton === "cv" ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FileText size={20} />
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
                className="flex items-center gap-2 text-base"
                size="lg"
                asChild
              >
                <Link to="contact" smooth={true} duration={500} offset={-70}>
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredButton === "contact" ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail size={20} />
                  </motion.span>
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive background element */}
          <motion.div
            className="w-full mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          ></motion.div>
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
              className="p-3 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown size={28} className="text-primary" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
