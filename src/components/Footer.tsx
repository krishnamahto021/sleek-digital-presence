import React from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-scroll";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { bio } = useData();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Back to top button */}
          <div className="mb-8">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full animate-pulse"
              asChild
            >
              <Link
                to="hero"
                smooth={true}
                duration={800}
                offset={-100}
                spy={true}
                isDynamic={true}
                ignoreCancelEvents={false}
              >
                <ArrowUp size={20} />
              </Link>
            </Button>
          </div>

          <h3 className="text-2xl font-bold mb-4">{bio.name}</h3>

          {/* Simple navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["About", "Projects", "Skills", "Resume", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={800}
                  isDynamic={true}
                  ignoreCancelEvents={false}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {year} {bio.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
