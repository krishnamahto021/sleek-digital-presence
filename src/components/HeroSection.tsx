
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Link } from "react-scroll";
import { useData } from "../contexts/DataContext";
import HeroAnimation from "./HeroAnimation";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { bio } = useData();

  return (
    <section id="hero" className="min-h-screen flex items-center relative bg-background overflow-hidden">
      {/* Purple gradient effect */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-lg md:text-xl mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Providing <span className="text-[#8A85FF]">the best</span>
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              project experience.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {bio.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button className="bg-[#8A85FF] hover:bg-[#7A75EF] text-white" asChild>
                <Link to="about" smooth={true} duration={500} offset={-70}>
                  Learn more
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hidden md:block relative z-10 h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer"
          >
            <ArrowDown size={24} className="text-primary" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
