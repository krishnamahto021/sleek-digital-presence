import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { ExternalLink, Github } from 'lucide-react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Chip,
  Button,
  Stack,
  ButtonGroup,
  useTheme
} from '@mui/material';

const ProjectsSection = () => {
  const theme = useTheme();
  const { projects } = useData();
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();
  
  // Filter projects based on selected tag
  const filteredProjects = filter
    ? projects.filter(project => project.tags.includes(filter))
    : projects;

  return (
    <Box 
      component="section" 
      id="projects" 
      sx={{ 
        py: {
          xs: theme.custom.sectionSpacing.mobile,
          md: theme.custom.sectionSpacing.desktop
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
        >
          My Projects
        </Typography>
        
        <Box 
          sx={{ 
            height: 4, 
            width: 80, 
            bgcolor: 'primary.main', 
            mx: 'auto', 
            borderRadius: theme.custom.borderRadius.small,
            mb: theme.spacing(5)
          }} 
        />
        
        {/* Filter buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: theme.spacing(5) }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Button
              variant={filter === null ? "contained" : "outlined"}
              onClick={() => setFilter(null)}
              size="small"
            >
              All
            </Button>
            
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={filter === tag ? "contained" : "outlined"}
                onClick={() => setFilter(tag)}
                size="small"
              >
                {tag}
              </Button>
            ))}
          </Stack>
        </Box>
        
        {/* Projects grid */}
        <Grid container spacing={theme.custom.cardSpacing.margin}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height={200}
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      transition: `transform ${theme.custom.transitions.normal} ease`,
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, pb: 1, p: theme.custom.cardSpacing.padding }}>
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      gutterBottom
                    >
                      {project.title}
                    </Typography>
                    
                    <Box sx={{ mb: theme.spacing(2) }}>
                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {project.tags.slice(0, 3).map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {project.tags.length > 3 && (
                          <Chip
                            label={`+${project.tags.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', p: theme.custom.cardSpacing.padding }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Github size={16} />}
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ minWidth: 80 }}
                    >
                      Code
                    </Button>
                    
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ExternalLink size={16} />}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ minWidth: 80 }}
                    >
                      Demo
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
