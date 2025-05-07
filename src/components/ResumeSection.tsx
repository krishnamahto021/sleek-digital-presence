
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { FileText, Calendar, Briefcase, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResumeSection = () => {
  const { bio, experience, education } = useData();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric'
    });
  };

  return (
    <section id="resume">
      <div className="container mx-auto">
        <h2 className="section-title">Resume</h2>

        <div className="flex flex-col items-center mb-12">
          <Button size="lg" className="flex items-center gap-2" asChild>
            <a href={bio.resume} target="_blank" rel="noopener noreferrer">
              <FileText size={18} />
              Download Full Resume
            </a>
          </Button>
        </div>

        <Tabs defaultValue="experience" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase size={16} />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <Book size={16} />
              Education
            </TabsTrigger>
          </TabsList>
          
          {/* Experience Tab */}
          <TabsContent value="experience">
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{exp.title}</CardTitle>
                          <CardDescription className="text-primary font-medium mt-1">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? exp.endDate : formatDate(exp.endDate)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">{exp.description}</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Education Tab */}
          <TabsContent value="education">
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{edu.degree}</CardTitle>
                          <CardDescription className="text-primary font-medium mt-1">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{edu.field}</p>
                      {edu.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResumeSection;
